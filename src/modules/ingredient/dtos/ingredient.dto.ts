import { Ingredient } from '../schemas/ingredient.schema';
import { CreateOrUpdateIngredientDto } from './create-or-update-ingredient.dto';
import { Exclude, Expose } from 'class-transformer';
import { TransformGetId } from '../../../utils/transform-get-id.decorator';
import mongoose from 'mongoose';

export class IngredientDto extends CreateOrUpdateIngredientDto implements Ingredient {
  @Exclude()
  _id: mongoose.Types.ObjectId;

  @Expose()
  @TransformGetId()
  id: string;
}