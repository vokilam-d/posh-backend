import { IsEnum, IsISO8601, IsOptional, ValidateNested } from 'class-validator';
import { Order } from '../schemas/order.schema';
import { Expose, Type } from 'class-transformer';
import { PaymentType } from '../enums/payment-type.enum';
import { OrderItemDto } from './order-item.dto';

export class CreateOrUpdateOrderDto implements Omit<Order, '_id' | 'totalCost'> {
  @Expose()
  @Type(() => OrderItemDto)
  @ValidateNested({ each: true })
  orderItems: OrderItemDto[];

  @Expose()
  @IsEnum(PaymentType)
  paymentType: PaymentType;

  @Expose()
  @IsOptional()
  @IsISO8601()
  createdAtIso: string;
}
