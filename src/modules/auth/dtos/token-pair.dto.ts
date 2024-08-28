import { Expose } from 'class-transformer';

export class TokenPairDto {
  @Expose()
  accessToken: string;

  @Expose()
  refreshToken: string;
}
