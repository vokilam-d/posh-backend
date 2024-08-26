import { Expose } from 'class-transformer';
import { IsISO8601, IsOptional } from 'class-validator';

export class GetOrdersReportQueryDto {
  @Expose()
  @IsISO8601()
  @IsOptional()
  fromIso?: string;

  @Expose()
  @IsISO8601()
  @IsOptional()
  toIso?: string;
}
