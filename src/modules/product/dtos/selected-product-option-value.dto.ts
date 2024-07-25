import { Expose } from 'class-transformer';
import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { SelectedProductOptionValue } from '../schemas/selected-product-option-value.schema';

export class SelectedProductOptionValueDto implements SelectedProductOptionValue {
  @Expose()
  @IsString()
  @IsNotEmpty()
  optionValueId: string;

  @Expose()
  @IsBoolean()
  isPriceDiffOverridden: boolean;

  @Expose()
  @IsOptional()
  @IsNumber()
  priceDiff: number;
}
