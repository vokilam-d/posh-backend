import { OrderItemSelectedOption } from '../schemas/order-item-selected-option.schema';
import { Expose } from 'class-transformer';
import { IsString } from 'class-validator';


export class OrderItemSelectedOptionDto implements OrderItemSelectedOption {
  @Expose()
  @IsString()
  optionId: string;

  @Expose()
  optionName: string;

  @Expose()
  @IsString()
  optionValueId: string;

  @Expose()
  optionValueName: string;

  @Expose()
  priceDiff: number;
}
