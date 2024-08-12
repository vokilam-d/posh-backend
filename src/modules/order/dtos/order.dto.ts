import { Order } from '../schemas/order.schema';
import { CreateOrUpdateOrderDto } from './create-or-update-order.dto';
import { Expose, Type } from 'class-transformer';
import { OrderItemDto } from './order-item.dto';
import { TransformGetId } from '../../../utils/transform-get-id.decorator';

export class OrderDto extends CreateOrUpdateOrderDto implements Omit<Order, '_id'> {
  @Expose()
  @TransformGetId(false)
  id: number;

  @Expose()
  totalPrimeCost: number;

  @Expose()
  totalPrice: number;

  @Expose()
  totalProfit: number;

  @Expose()
  @Type(() => OrderItemDto)
  override orderItems: OrderItemDto[];
}
