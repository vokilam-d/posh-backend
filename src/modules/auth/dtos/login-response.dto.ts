import { Expose } from 'class-transformer';
import { UserDto } from '../../user/dtos/user.dto';
import { TokenPairDto } from './token-pair.dto';

export class LoginResponseDto extends UserDto implements TokenPairDto {
  @Expose()
  accessToken: string;

  @Expose()
  refreshToken: string;
}
