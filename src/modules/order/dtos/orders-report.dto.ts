import { Expose } from 'class-transformer';

export class OrdersReportDto {
  @Expose()
  price: number = 0;
  @Expose()
  profit: number = 0;
  @Expose()
  primeCost: number = 0;
  @Expose()
  orderCount: number = 0;
  @Expose()
  avgPrice: number = 0;
}
