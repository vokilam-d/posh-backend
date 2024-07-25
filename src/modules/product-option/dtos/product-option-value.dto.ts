import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { ProductOptionValue } from '../schemas/product-option.schema';
import { Expose, Transform } from 'class-transformer';
import { transliterate } from '../../../utils/transliterate.util';

export class ProductOptionValueDto implements ProductOptionValue {
  @Expose()
  @Transform(({ obj }) => obj.id || transliterate(obj.name))
  @IsOptional()
  id: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  name: string;

  @Expose()
  @IsNumber()
  priceDiff: number;
}
