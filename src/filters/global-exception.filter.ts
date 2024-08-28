import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { User } from '../modules/user/schemas/user.schema';
import { ResponseDto } from '../dtos/response.dto';
import { FastifyError } from 'fastify';
import { isObject } from 'class-validator';
import { EventName, EventsService } from '../modules/global/services/events.service';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {

  private logger = new Logger(GlobalExceptionFilter.name);

  constructor(
    private readonly eventsService: EventsService,
  ) {
    this.handleUnhandledExceptions();
  }

  catch(exception: Error, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const req = ctx.getRequest();
    const res = ctx.getResponse();

    const responseDto = new ResponseDto();
    responseDto.setStatus('error');
    responseDto.error.path = req.raw.url;
    responseDto.error.method = req.raw.method;
    responseDto.error.referer = req.headers.referer;
    responseDto.error.timestampIso = new Date().toISOString();

    let statusCode: number;
    let isLogError: boolean = false;
    let isLogBody: boolean = false;

    const user = req.user as User;
    const userInfo = user ? `userLogin=${user.username}` : ``;

    if (GlobalExceptionFilter.isMongoDuplicationException(exception)) {
      const stack = exception.stack;
      exception = new BadRequestException(GlobalExceptionFilter.getMongoDuplicationMessage(exception));
      exception.stack = stack;

      isLogError = true;
    }

    if (exception instanceof HttpException) {
      statusCode = exception.getStatus();
      responseDto.error.message = exception.message;

      const exceptionResponse = exception.getResponse();
      if (isObject(exceptionResponse)) {
        const { statusCode, message, error, ...exceptionResponseRest } = exceptionResponse as any; // eslint-disable-line @typescript-eslint/no-explicit-any
        if (Object.keys(exceptionResponseRest).length) {
          responseDto.error.data = exceptionResponseRest;
        }

        if (Array.isArray(message)) {
          responseDto.error.message = message.join(', ');
        }
      }

    } else if ((exception as FastifyError).statusCode) {
      statusCode = (exception as FastifyError).statusCode;
      responseDto.error.message = exception.message;

      isLogError = true;
    } else {
      statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
      responseDto.error.message = exception.message;

      isLogError = true;
      isLogBody = true;
    }

    if (isLogError) {
      const errorObj = {
        statusCode,
        ...(userInfo ? { userInfo } : {}),
        ...responseDto.error,
        stack: exception.stack?.split('\n').map(str => str.trim()),
      };
      this.logger.error(errorObj);

      this.eventsService.emit(EventName.AppError, errorObj, 'Caught error');
    }
    if (isLogBody) {
      this.logger.error({ body: req.body });
    }

    if (!statusCode) {
      statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
    }
    responseDto.error.code = statusCode;

    res.status(statusCode).send(responseDto);
  }

  private static isMongoDuplicationException(exception: any) {// eslint-disable-line @typescript-eslint/no-explicit-any
    return exception.code === 11000 || exception.code === 11001;
  }

  private static getMongoDuplicationMessage(exception: Error) {
    const collectionKeyValueRegex = exception.message.match(/collection: [^.]*\.(\S*).*key:\s+{\s+(.*):\s+(?:"(.*)"|(.*))\s+}/); // eslint-disable-line max-len
    if (collectionKeyValueRegex === null) {
      return 'Have duplicates, cannot save this data';
    }

    const collection = collectionKeyValueRegex[1] || '';
    const key = collectionKeyValueRegex[2] || '';
    const value = collectionKeyValueRegex[3] || collectionKeyValueRegex[4] || '';

    return `"${key}" with value "${value}" already exists in collection "${collection}"`;
  }

  private handleUnhandledExceptions(): void {
    process.on('unhandledRejection', (reason) => {
      const errorDescription = 'unhandledRejection';
      this.logger.error(errorDescription);
      this.logger.error(reason, (reason as Error).stack);

      this.eventsService.emit(EventName.AppError, reason, errorDescription);
    });
  }
}
