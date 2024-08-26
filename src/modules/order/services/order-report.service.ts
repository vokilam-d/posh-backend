import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { Order } from '../schemas/order.schema';
import { GetOrdersReportQueryDto } from '../dtos/get-orders-report-query.dto';
import { OrdersReportDto } from '../dtos/orders-report.dto';

@Injectable()
export class OrderReportService implements OnApplicationBootstrap {

  constructor(
    @InjectModel(Order.name) private readonly orderModel: Model<Order>,
  ) {}

  onApplicationBootstrap(): any {
  }

  async getReport(queryDto: GetOrdersReportQueryDto): Promise<OrdersReportDto> {
    const getReportKey = (key: keyof OrdersReportDto): keyof OrdersReportDto => {
      return key;
    };

    const rangeQuery: FilterQuery<Order> = {};
    if (queryDto.fromIso || queryDto.toIso) {
      rangeQuery[this.getOrderKey('createdAtIso')] = {};
    }
    if (queryDto.fromIso) {
      rangeQuery[this.getOrderKey('createdAtIso')].$gte = queryDto.fromIso;
    }
    if (queryDto.toIso) {
      rangeQuery[this.getOrderKey('createdAtIso')].$lte = queryDto.toIso;
    }

    const result = await this.orderModel.aggregate(
      [
        { $match: rangeQuery, },
        {
          $group: {
            _id: null,
            [getReportKey('price')]: { $sum: `$${this.getOrderKey('totalPrice')}` },
            [getReportKey('profit')]: { $sum: `$${this.getOrderKey('totalProfit')}` },
            [getReportKey('primeCost')]: { $sum: `$${this.getOrderKey('totalPrimeCost')}` },
            [getReportKey('orderCount')]: { $sum: 1 },
            [getReportKey('avgPrice')]: { $avg: `$${this.getOrderKey('totalPrice')}` },
          }
        },
        {
          $project: {
            _id: 0,
            [getReportKey('price')]: { $round: [`$${getReportKey('price')}`, 2] },
            [getReportKey('profit')]: { $round: [`$${getReportKey('profit')}`, 2] },
            [getReportKey('primeCost')]: { $round: [`$${getReportKey('primeCost')}`, 2] },
            [getReportKey('orderCount')]: 1,
            [getReportKey('avgPrice')]: { $round: [`$${getReportKey('avgPrice')}`, 2] },
          },
        },
      ],
      { maxTimeMS: 60000, allowDiskUse: true },
    ).exec();

    const reportDto = new OrdersReportDto();
    return Object.assign(reportDto, result[0]); // "result" is empty array, if no orders matched
  }

  private getOrderKey(key: keyof Order): keyof Order {
    return key;
  }
}
