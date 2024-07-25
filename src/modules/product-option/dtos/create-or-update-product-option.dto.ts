import { ArrayMinSize, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ProductOption } from '../schemas/product-option.schema';
import { Expose, Type } from 'class-transformer';
import { ProductOptionValueDto } from './product-option-value.dto';

export class CreateOrUpdateProductOptionDto implements Pick<ProductOption, "name" | 'values'> {
  @Expose()
  @IsString()
  @IsNotEmpty()
  name: string;

  @Expose()
  @IsOptional()
  @Type(() => ProductOptionValueDto)
  @ArrayMinSize(2)
  values: ProductOptionValueDto[];
}