import { Controller, Get, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { OrderReportService } from '../services/order-report.service';
import { GetOrdersReportQueryDto } from '../dtos/get-orders-report-query.dto';
import { OrdersReportDto } from '../dtos/orders-report.dto';
import { toDto } from '../../../utils/to-dto.util';

@Controller('reports/orders')
@UsePipes(new ValidationPipe({ transform: true }))
export class OrderReportController {
  constructor(private readonly orderReportService: OrderReportService) {}

  @Get()
  async getAllOrders(@Query() dto: GetOrdersReportQueryDto): Promise<OrdersReportDto> {
    const report = await this.orderReportService.getReport(dto);
    return toDto(OrdersReportDto, report);
  }
}
