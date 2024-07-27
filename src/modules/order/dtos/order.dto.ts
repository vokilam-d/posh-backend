import { Order } from '../schemas/order.schema';
import { CreateOrUpdateOrderDto } from './create-or-update-order.dto';
import { Expose, Transform } from 'class-transformer';

export class OrderDto extends CreateOrUpdateOrderDto implements Omit<Order, '_id'> {
  @Expose()
  @Transform(({ obj }) => obj.id || obj._id)
  id: number;

  @Expose()
  totalCost: number;
}
