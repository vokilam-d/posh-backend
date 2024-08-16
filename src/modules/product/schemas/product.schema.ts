import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SelectedIngredient } from './selected-ingredient.schema';
import { Option } from './option.schema';
import { OptionVariant } from './option-variant.schema';
import mongoose from 'mongoose';

@Schema()
export class Product {
  _id: mongoose.Types.ObjectId;

  @Prop({ required: true, default: true })
  isEnabled: boolean;

  @Prop({ required: true })
  name: string;

  @Prop({ default: null })
  categoryId: string;

  @Prop({ type: [SelectedIngredient], default: [] })
  ingredients: SelectedIngredient[];

  @Prop({ type: [Option], default: [] })
  options: Option[];

  @Prop({ type: [OptionVariant], default: [], minlength: 1 })
  variants: OptionVariant[];

  @Prop({ default: 0, min: 0 })
  purchasePrice: number;

  @Prop({ default: null })
  photoUrl: string | null;

  @Prop({ required: true })
  sortOrder: number;

  @Prop({ default: new Date().toISOString() })
  createdAtIso: string;

  @Prop({ default: new Date().toISOString() })
  updatedAtIso: string;


  static collectionName: string = 'products';
}

export const ProductSchema = SchemaFactory.createForClass(Product);
