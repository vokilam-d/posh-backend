import { ProductOption } from '../schemas/product-option.schema';
import { CreateOrUpdateProductOptionDto } from './create-or-update-product-option.dto';
import { Expose, Transform } from 'class-transformer';

export class ProductOptionDto extends CreateOrUpdateProductOptionDto implements ProductOption {
  @Expose()
  @Transform(({ obj }) => obj._id?.toString())
  id: string;
}