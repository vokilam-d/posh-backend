import { Prop, Schema } from '@nestjs/mongoose';


@Schema()
export class OrderItemSelectedOption {
  @Prop({ required: true })
  optionId: string;

  @Prop({ required: true })
  optionName: string;

  @Prop({ required: true })
  optionValueId: string;

  @Prop({ required: true })
  optionValueName: string;

  @Prop({ default: 0 })
  priceDiff: number;
}
