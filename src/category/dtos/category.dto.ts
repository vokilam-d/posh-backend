import { IsString } from 'class-validator';
import { Category } from '../schemas/category.schema';
import { CreateOrUpdateCategoryDto } from './create-or-update-category.dto';
import { Expose } from 'class-transformer';

export class CategoryDto extends CreateOrUpdateCategoryDto implements Category {
  @Expose()
  @IsString()
  id: string;
}