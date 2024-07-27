import { Prop, Schema } from '@nestjs/mongoose';
import { OrderItemSelectedOption } from './order-item-selected-option.schema';


@Schema()
export class OrderItem {
  @Prop({ required: true })
  productId: string;

  @Prop({ required: true })
  productName: string;

  @Prop()
  photoUrl: string;

  @Prop({ required: true })
  qty: number;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  cost: number;

  @Prop({ type: [OrderItemSelectedOption], default: [] })
  selectedOptions: OrderItemSelectedOption[];
}
