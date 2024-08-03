import { ArrayMinSize, IsEnum, IsISO8601, IsOptional, ValidateNested } from 'class-validator';
import { Order } from '../schemas/order.schema';
import { Expose, Type } from 'class-transformer';
import { PaymentType } from '../enums/payment-type.enum';
import { CreateOrderItemDto } from './create-order-item.dto';

export class CreateOrUpdateOrderDto implements
  Omit<Order, '_id' | 'totalPrimeCost' | 'totalPrice' | 'totalProfit' | 'orderItems'>,
  Record<keyof Pick<Order, 'orderItems'>, CreateOrderItemDto[]> {

  @Expose()
  @Type(() => CreateOrderItemDto)
  @ValidateNested({ each: true })
  @ArrayMinSize(1)
  orderItems: CreateOrderItemDto[];

  @Expose()
  @IsEnum(PaymentType)
  paymentType: PaymentType;

  @Expose()
  @IsOptional()
  @IsISO8601()
  createdAtIso: string;
}
