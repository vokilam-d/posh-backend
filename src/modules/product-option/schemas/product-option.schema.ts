import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class ProductOptionValue {
  @Prop({ required: true })
  id: string;

  @Prop({ required: true })
  name: string;

  @Prop({ default: 0 })
  priceDiff: number;
}

@Schema({ id: true })
export class ProductOption {
  id: string;

  @Prop({ required: true })
  name: string;

  @Prop({ type: [ProductOptionValue], default: [] })
  values: ProductOptionValue[];
}

export const ProductOptionSchema = SchemaFactory.createForClass(ProductOption);
