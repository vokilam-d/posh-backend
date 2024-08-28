import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Role } from '../enums/role.enum';
import { CreateUserDto } from './create-user.dto';
import { Expose } from 'class-transformer';
import { TrimString } from '../../../utils/trim-string.decorator';

export class UpdateUserDto implements Partial<CreateUserDto> {
  @Expose()
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @TrimString()
  username: string;

  @Expose()
  @IsOptional()
  @IsString()
  password: string;

  @Expose()
  @IsOptional()
  @IsString()
  phoneNumber: string;

  @Expose()
  @IsOptional()
  @IsEnum(Role)
  role: Role;
}
