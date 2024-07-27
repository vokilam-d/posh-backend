import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { OrderService } from '../services/order.service';
import { CreateOrUpdateOrderDto } from '../dtos/create-or-update-order.dto';
import { OrderDto } from '../dtos/order.dto';
import { toDto } from '../../../utils/to-dto.util';

@Controller('orders')
@UsePipes(new ValidationPipe({ transform: true }))
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get()
  async getAllOrders(): Promise<OrderDto[]> {
    const orders = await this.orderService.getAllOrders();
    return orders.map(order => toDto(OrderDto, order));
  }

  @Get(':id')
  async getOrder(@Param('id') orderId: string): Promise<OrderDto> {
    const order = await this.orderService.getOrder(parseInt(orderId));
    if (!order) {
      throw new NotFoundException(`Order with id ${orderId} not found`);
    }

    return toDto(OrderDto, order);
  }

  @Post()
  async create(@Body() orderDto: CreateOrUpdateOrderDto): Promise<OrderDto> {
    const order = await this.orderService.create(orderDto);
    return toDto(OrderDto, order);
  }

  @Delete(':id')
  async deleteOrder(@Param('id') orderId: string): Promise<OrderDto> {
    const order = await this.orderService.deleteOrder(orderId);
    if (!order) {
      throw new NotFoundException(`Order with id ${orderId} not found`);
    }

    return toDto(OrderDto, order);
  }
}
