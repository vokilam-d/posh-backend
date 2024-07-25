import { Prop, Schema } from '@nestjs/mongoose';

@Schema({ id: true })
export class SelectedProductOptionValue {
  @Prop({ required: true })
  optionValueId: string;

  @Prop({ required: true })
  isPriceDiffOverridden: boolean;

  @Prop({ default: 0 })
  priceDiff: number;
}
