import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SelectedProductOption } from './selected-product-option.schema';


@Schema({ id: true })
export class Product {
  id: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  price: number;

  @Prop({ default: null })
  categoryId: string;

  @Prop({ default: null })
  photoUrl: string | null;

  @Prop({ required: true })
  sortOrder: number;

  @Prop({ type: [SelectedProductOption], default: [] })
  options: SelectedProductOption[];


  static collectionName: string = 'products';
}

export const ProductSchema = SchemaFactory.createForClass(Product);
