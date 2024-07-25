import { IsNotEmpty, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Product } from '../schemas/product.schema';
import { Expose, Type } from 'class-transformer';
import { SelectedProductOptionDto } from './selected-product-option.dto';

export class CreateOrUpdateProductDto implements Omit<Product, 'id'> {
  @Expose()
  @IsString()
  @IsNotEmpty()
  name: string;

  @Expose()
  @IsNumber()
  price: number;

  @Expose()
  @IsOptional()
  @IsString()
  categoryId: string;

  @Expose()
  @IsOptional()
  @IsString()
  photoUrl: string;

  @Expose()
  @Type(() => SelectedProductOptionDto)
  @ValidateNested({ each: true })
  options: SelectedProductOptionDto[];

  @Expose()
  @IsNumber()
  sortOrder: number;
}