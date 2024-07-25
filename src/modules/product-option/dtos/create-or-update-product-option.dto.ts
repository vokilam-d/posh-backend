import { ArrayMinSize, IsNotEmpty, IsOptional, IsString, ValidateNested } from 'class-validator';
import { ProductOption } from '../schemas/product-option.schema';
import { Expose, Type } from 'class-transformer';
import { ProductOptionValueDto } from './product-option-value.dto';

export class CreateOrUpdateProductOptionDto implements Omit<ProductOption, 'id'> {
  @Expose()
  @IsString()
  @IsNotEmpty()
  name: string;

  @Expose()
  @IsOptional()
  @Type(() => ProductOptionValueDto)
  @ValidateNested({ each: true })
  @ArrayMinSize(2)
  values: ProductOptionValueDto[];
}