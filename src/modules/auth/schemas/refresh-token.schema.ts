import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';


@Schema()
export class RefreshToken {
  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  activeRefreshToken: string;

  @Prop({ required: true, default: [] })
  rotatedRefreshTokens: string[];

  @Prop({ default: new Date().toISOString() })
  createdAtIso: string;

  @Prop({ default: new Date().toISOString() })
  activeIssuedAtIso: string;

  @Prop({ required: true, default: false })
  isInvalidated: boolean;

  static collectionName = 'refresh-tokens';
}

export const RefreshTokenSchema = SchemaFactory.createForClass(RefreshToken);
