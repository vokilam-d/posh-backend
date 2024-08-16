import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { Category } from '../schemas/category.schema';
import { Expose } from 'class-transformer';
import { TrimString } from '../../../utils/trim-string.decorator';

export class CreateOrUpdateCategoryDto implements Omit<Category, '_id' | 'createdAtIso' | 'updatedAtIso'> {
  @Expose()
  @IsBoolean()
  isEnabled: boolean;

  @Expose()
  @IsString()
  @IsNotEmpty()
  @TrimString()
  name: string;

  @Expose()
  @IsOptional()
  @IsString()
  photoUrl: string;

  @Expose()
  @IsNumber()
  sortOrder: number;
}