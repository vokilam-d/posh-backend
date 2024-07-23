import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';


@Schema({ id: true })
export class Category {
  id: string;

  @Prop({ required: true })
  name: string;

  @Prop({ default: null })
  parentCategoryId: string | null;

  @Prop()
  photoUrl?: string;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
