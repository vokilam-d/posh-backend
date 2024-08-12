import { Expose } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';
import { OptionValue } from '../schemas/option-value.schema';
import { TrimString } from '../../../utils/trim-string.decorator';

export class OptionValueDto implements OptionValue {
  @Expose()
  @IsString()
  @IsNotEmpty()
  id: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  @TrimString()
  name: string;
}
