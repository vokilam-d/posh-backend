import { Product } from '../schemas/product.schema';
import { CreateOrUpdateProductDto } from './create-or-update-product.dto';
import { Expose, Transform } from 'class-transformer';

export class ProductDto extends CreateOrUpdateProductDto implements Product {
  @Expose()
  @Transform(({ obj }) => obj._id?.toString())
  id: string;
}