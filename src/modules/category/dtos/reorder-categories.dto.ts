import { IsNumber, IsString } from 'class-validator';
import { Expose, Type } from 'class-transformer';

export class ReorderCategoryDto {
  @Expose()
  @IsString()
  id: string;

  @Expose()
  @IsNumber()
  newSortOrder: number;
}

export class ReorderCategoriesDto {
  @Expose()
  @Type(() => ReorderCategoryDto)
  categories: ReorderCategoryDto[]
}
