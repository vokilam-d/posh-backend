import { IsNumber, IsString } from 'class-validator';
import { Expose, Type } from 'class-transformer';

export class ReorderProductDto {
  @Expose()
  @IsString()
  id: string;

  @Expose()
  @IsNumber()
  newSortOrder: number;
}

export class ReorderProductsDto {
  @Expose()
  @Type(() => ReorderProductDto)
  products: ReorderProductDto[];
}
