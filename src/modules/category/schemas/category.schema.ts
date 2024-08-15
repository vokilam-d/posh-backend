import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';


@Schema()
export class Category {
  _id: mongoose.Types.ObjectId;

  @Prop({ required: true })
  name: string;

  @Prop({ default: null })
  photoUrl: string | null;

  @Prop({ required: true })
  sortOrder: number;

  @Prop({ default: new Date().toISOString() })
  createdAtIso: string;

  @Prop({ default: new Date().toISOString() })
  updatedAtIso: string;

  static collectionName = 'categories';
}

export const CategorySchema = SchemaFactory.createForClass(Category);
