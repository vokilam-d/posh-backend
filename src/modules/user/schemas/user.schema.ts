import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Role } from '../enums/role.enum';
import { v4 as uuid } from 'uuid';


@Schema()
export class User {
  @Prop({ required: true, default: uuid() })
  _id: string;

  @Prop({ required: true })
  username: string;

  @Prop({ default: null })
  passwordHash: string | null;

  @Prop({ default: null })
  phoneNumber: string | null;

  @Prop({ default: Role.User, enum: Object.keys(Role) })
  role: Role;

  @Prop({ default: new Date().toISOString() })
  createdAtIso: string;

  @Prop({ default: new Date().toISOString() })
  updatedAtIso: string;

  static collectionName = 'users';
}

export const UserSchema = SchemaFactory.createForClass(User);
