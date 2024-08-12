import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Ingredient } from '../schemas/ingredient.schema';
import { Expose } from 'class-transformer';
import { Unit } from '../enums/unit.enum';
import { TrimString } from '../../../utils/trim-string.decorator';

export class CreateOrUpdateIngredientDto implements Omit<Ingredient, '_id'> {
  @Expose()
  @IsString()
  @IsNotEmpty()
  @TrimString()
  name: string;

  @Expose()
  @IsEnum(Unit)
  @IsNotEmpty()
  unit: Unit;

  @Expose()
  @IsNumber()
  @IsNotEmpty()
  price: number;

  @Expose()
  @IsNumber()
  @IsNotEmpty()
  qty: number;
}