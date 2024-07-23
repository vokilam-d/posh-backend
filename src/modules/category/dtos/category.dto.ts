import { Category } from '../schemas/category.schema';
import { CreateOrUpdateCategoryDto } from './create-or-update-category.dto';
import { Expose, Transform } from 'class-transformer';

export class CategoryDto extends CreateOrUpdateCategoryDto implements Category {
  @Expose()
  @Transform(({ obj }) => obj._id?.toString())
  id: string;

  @Expose()
  sortOrder: number;
}