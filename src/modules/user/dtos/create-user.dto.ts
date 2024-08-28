import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Expose } from 'class-transformer';
import { TrimString } from '../../../utils/trim-string.decorator';
import { User } from '../schemas/user.schema';
import { Role } from '../enums/role.enum';

export class CreateUserDto implements Omit<User, '_id' | 'createdAtIso' | 'updatedAtIso' | 'passwordHash'> {
  @Expose()
  @IsString()
  @IsNotEmpty()
  @TrimString()
  username: string;

  @Expose()
  @IsNotEmpty()
  @IsString()
  password: string;

  @Expose()
  @IsOptional()
  @IsString()
  phoneNumber: string;

  @Expose()
  @IsEnum(Role)
  role: Role;
}
