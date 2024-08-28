import { Exclude, Expose } from 'class-transformer';
import { User } from '../schemas/user.schema';
import { TransformGetId } from '../../../utils/transform-get-id.decorator';
import { Role } from '../enums/role.enum';

export class UserDto implements Omit<User, '_id'> {
  @Expose()
  @TransformGetId()
  id: string;

  @Expose()
  username: string;

  @Exclude()
  passwordHash: string;

  @Expose()
  phoneNumber: string;

  @Expose()
  role: Role;

  @Expose()
  createdAtIso: string;

  @Expose()
  updatedAtIso: string;
}
