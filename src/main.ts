import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { config } from "./config";
import * as fastifyMultipart from '@fastify/multipart';
import * as fastifyStatic from '@fastify/static';
import * as fastifyCookie from '@fastify/cookie';
import * as fastifyCompress from '@fastify/compress';
import * as fastifyHelmet from '@fastify/helmet';
import { join } from 'path';
import { isProdEnv } from './utils/is-prod-env.util';

const logger = new Logger('main.ts');

async function bootstrap() {

  const fastifyAdapter = new FastifyAdapter({ ignoreTrailingSlash: true, maxParamLength: 500 });

  fastifyAdapter.register(fastifyMultipart, { limits: { fileSize: config.fileSizeLimitBytes } });
  fastifyAdapter.register(fastifyCookie);
  fastifyAdapter.register(fastifyCompress);
  fastifyAdapter.register(fastifyHelmet, { crossOriginResourcePolicy: false });
  if (!isProdEnv()) {
    fastifyAdapter.register(fastifyStatic, { root: join(__dirname, '..') });
  }

  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    fastifyAdapter,
  );
  app.setGlobalPrefix(`/api/v1`);
  app.enableCors();

  await app.listen(config.port, '0.0.0.0');

  logger.log(`Server running on port ${config.port}`);
}
bootstrap();
