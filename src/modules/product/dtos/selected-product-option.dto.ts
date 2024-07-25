import { ArrayMinSize, IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { Expose, Type } from 'class-transformer';
import { SelectedProductOptionValueDto } from './selected-product-option-value.dto';
import { SelectedProductOption } from '../schemas/selected-product-option.schema';

export class SelectedProductOptionDto implements SelectedProductOption {
  @Expose()
  @IsString()
  @IsNotEmpty()
  optionId: string;

  @Expose()
  @ArrayMinSize(2)
  @Type(() => SelectedProductOptionValueDto)
  @ValidateNested({ each: true })
  optionValues: SelectedProductOptionValueDto[];
}
