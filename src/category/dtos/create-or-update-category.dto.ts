import { IsNotEmpty, IsString } from 'class-validator';
import { Category } from '../schemas/category.schema';
import { Expose } from 'class-transformer';

export class CreateOrUpdateCategoryDto implements Pick<Category, "name" | "parentCategoryId" | 'photoUrl'> {
  @Expose()
  @IsString()
  @IsNotEmpty()
  name: string;

  @Expose()
  @IsString()
  parentCategoryId: string;

  @Expose()
  @IsString()
  photoUrl: string;
}