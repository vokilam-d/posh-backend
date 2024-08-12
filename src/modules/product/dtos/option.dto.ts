import { OptionValueDto } from './option-value.dto';
import { IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { Expose, Type } from 'class-transformer';
import { Option } from '../schemas/option.schema';
import { TrimString } from '../../../utils/trim-string.decorator';

export class OptionDto implements Option {
  @Expose()
  @IsString()
  @IsNotEmpty()
  id: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  @TrimString()
  name: string;

  @Expose()
  @Type(() => OptionValueDto)
  @ValidateNested({ each: true })
  values: OptionValueDto[];
}
