import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import * as fs from 'fs';
import { pipeline } from 'stream';
import { promisify } from 'util';
import * as sharp from 'sharp';
import { join, parse } from 'path';
import { FastifyRequest } from 'fastify';
import { config } from '../../../config';
import { v4 as uuid } from 'uuid';

const pipelinePromise = promisify(pipeline);

@Injectable()
export class PhotoUploadService {

  private uploadDirName = 'upload';
  private readonly resizeMaxDimension = 600;
  private allowedExt = ['jpg', 'jpeg', 'png', 'webp', 'svg', 'tiff', 'gif'];
  private logger = new Logger(PhotoUploadService.name);
  private newFileExtWithDot = '.jpg';

  constructor() {
  }

  async upload(request: FastifyRequest, entityDirName: string): Promise<string> {
    const multipartFile = await request.file();

    const { ext: extWithDot } = parse(multipartFile.filename);

    if (!this.allowedExt.includes(extWithDot.slice(1).toLowerCase())) {
      throw new BadRequestException(`Type of the file '${multipartFile.filename}' is not allowed`);
    }

    const name = uuid();

    const saveDirName = join(this.uploadDirName, entityDirName);
    await fs.promises.mkdir(saveDirName, { recursive: true });

    const fileNameWithExt = `${name}${this.newFileExtWithDot}`;

    const pathToFile = join(saveDirName, fileNameWithExt);

    const readStream = multipartFile.file;
    const resizeStream = this.buildResizeStreamForUpload();
    const writeStream = fs.createWriteStream(pathToFile);

    await pipelinePromise(readStream, resizeStream, writeStream); // execute streams

    if (multipartFile.file.truncated) {
      const fileSizeLimitMb = config.fileSizeLimitBytes / 1000 / 1000;
      throw new BadRequestException(`File size should be less then ${fileSizeLimitMb} MB`);
    }

    const fileUrl = `/${pathToFile}`;

    this.logger.log(`Uploaded photo ${fileUrl}`);

    return fileUrl;
  }

  async deletePhoto(photoUrl: string, mediaTypeDirName: string) {
    const { base: fileName } = parse(photoUrl);
    const pathToFile = join(this.uploadDirName, mediaTypeDirName, fileName);

    try {
      await fs.promises.unlink(pathToFile);

      this.logger.log(`Deleted media '${photoUrl}'`);
    } catch (e) {
      this.logger.error(`Could not delete saved media '${pathToFile}'`);
      this.logger.error(e);
    }
  }

  private buildResizeStreamForUpload(): sharp.Sharp {
    return sharp()
      .resize({
        width: this.resizeMaxDimension,
        height: this.resizeMaxDimension,
        fit: 'inside',
      })
      .jpeg({ progressive: true, quality: 80 });
  }
}
