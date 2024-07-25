import { Prop, Schema } from '@nestjs/mongoose';
import { SelectedProductOptionValue } from './selected-product-option-value.schema';

@Schema({ id: true })
export class SelectedProductOption {
  @Prop({ required: true })
  optionId: string;

  @Prop({ required: true, type: [SelectedProductOptionValue] })
  optionValues: SelectedProductOptionValue[];
}