import { IsNotEmpty, IsString } from 'class-validator';
import { Expose } from 'class-transformer';
import { TrimString } from '../../../utils/trim-string.decorator';
import { User } from '../../user/schemas/user.schema';

export class LoginDto implements Pick<User, 'username'> {
  @Expose()
  @IsString()
  @IsNotEmpty()
  @TrimString()
  username: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  password: string;
}
