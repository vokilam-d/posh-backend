import { Product } from '../schemas/product.schema';
import { CreateOrUpdateProductDto } from './create-or-update-product.dto';
import { Exclude, Expose } from 'class-transformer';
import { TransformGetId } from '../../../utils/transform-get-id.decorator';
import mongoose from 'mongoose';

export class ProductDto extends CreateOrUpdateProductDto implements Product {
  @Exclude()
  _id: mongoose.Types.ObjectId;

  @Expose()
  @TransformGetId()
  id: string;

  @Expose()
  createdAtIso: string;

  @Expose()
  updatedAtIso: string;
}