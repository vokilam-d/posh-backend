import { Module } from '@nestjs/common';
import { PhotoUploadService } from './services/photo-upload.service';

@Module({
  providers: [PhotoUploadService],
  exports: [PhotoUploadService],
})
export class PhotoUploadModule {}
