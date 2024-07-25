import { Expose } from 'class-transformer';

export class UploadedPhotoResponseDto {
  @Expose()
  photoUrl: string;
}
