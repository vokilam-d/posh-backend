import { OrderItem } from '../schemas/order-item.schema';
import { Expose, Type } from 'class-transformer';
import { IsNumber, IsString, ValidateNested } from 'class-validator';
import { OrderItemSelectedOptionDto } from './order-item-selected-option.dto';


export class OrderItemDto implements OrderItem {
  @Expose()
  @IsString()
  productId: string;

  @Expose()
  productName: string;

  @Expose()
  photoUrl: string;

  @Expose()
  @IsNumber()
  qty: number;

  @Expose()
  price: number;

  @Expose()
  cost: number;

  @Expose()
  @Type(() => OrderItemSelectedOptionDto)
  @ValidateNested({ each: true })
  selectedOptions: OrderItemSelectedOptionDto[];
}
