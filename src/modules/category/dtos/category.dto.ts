import { Category } from '../schemas/category.schema';
import { CreateOrUpdateCategoryDto } from './create-or-update-category.dto';
import { Exclude, Expose } from 'class-transformer';
import { TransformGetId } from '../../../utils/transform-get-id.decorator';
import mongoose from 'mongoose';

export class CategoryDto extends CreateOrUpdateCategoryDto implements Category {
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