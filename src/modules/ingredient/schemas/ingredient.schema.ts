import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Unit } from '../enums/unit.enum';
import * as mongoose from 'mongoose';

@Schema()
export class Ingredient {
  _id: mongoose.Types.ObjectId;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true, enum: Object.values(Unit) })
  unit: Unit;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  qty: number;

  @Prop({ default: new Date().toISOString() })
  createdAtIso: string;

  @Prop({ default: new Date().toISOString() })
  updatedAtIso: string;

  static collectionName = 'ingredients';
}

export const IngredientSchema = SchemaFactory.createForClass(Ingredient);
