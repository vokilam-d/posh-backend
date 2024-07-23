import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Category } from '../schemas/category.schema';
import { Expose } from 'class-transformer';

export class CreateOrUpdateCategoryDto implements Pick<Category, "name" | 'photoUrl'> {
  @Expose()
  @IsString()
  @IsNotEmpty()
  name: string;

  @Expose()
  @IsOptional()
  @IsString()
  photoUrl: string;
}