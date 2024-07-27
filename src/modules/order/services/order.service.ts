import { BadRequestException, Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order } from '../schemas/order.schema';
import { CreateOrUpdateOrderDto } from '../dtos/create-or-update-order.dto';
import { ProductService } from '../../product/services/product.service';
import { ProductOptionService } from '../../product-option/services/product-option.service';
import { ProductOptionValue } from '../../product-option/schemas/product-option.schema';
import { SelectedProductOptionValue } from '../../product/schemas/selected-product-option-value.schema';

@Injectable()
export class OrderService implements OnApplicationBootstrap {
  constructor(
    @InjectModel(Order.name) private readonly orderModel: Model<Order>,
    private readonly productService: ProductService,
    private readonly productOptionService: ProductOptionService,
  ) {}

  onApplicationBootstrap(): any {
  }

  async getAllOrders(): Promise<Order[]> {
    const orderDocs = await this.orderModel.find().sort({ _id: -1 }).exec();
    return orderDocs.map(order => order.toJSON());
  }

  async getOrder(orderId: number): Promise<Order> {
    const order = await this.orderModel.findById(orderId).exec();
    return order?.toJSON();
  }

  async create(orderDto: CreateOrUpdateOrderDto): Promise<Order> {
    for (const orderItem of orderDto.orderItems) {
      const foundProduct = await this.productService.getProduct(orderItem.productId);
      if (!foundProduct) {
        throw new BadRequestException(`Product with ID "${orderItem.productId}" not found`);
      }

      for (const selectedOption of orderItem.selectedOptions) {
        const foundSelectedProductOption = foundProduct.options.find(option => option.optionId === selectedOption.optionId);
        if (!foundSelectedProductOption) {
          throw new BadRequestException(`Product option with ID "${selectedOption.optionId}" is not added to product`);
        }
        const foundSelectedProductOptionValue = foundSelectedProductOption.optionValues.find(optionValue => {
          return optionValue.optionValueId === selectedOption.optionValueId;
        });
        if (!foundSelectedProductOptionValue) {
          throw new BadRequestException(`Product option value with ID "${selectedOption.optionId}" is not added to product`);
        }

        const foundProductOption = await this.productOptionService.getProductOption(selectedOption.optionId);
        if (!foundProductOption) {
          throw new BadRequestException(`Product option with ID "${selectedOption.optionId}" does not exist`);
        }
        const foundProductOptionValue = foundProductOption.values.find(optionValue => {
          return optionValue.id === selectedOption.optionValueId;
        });
        if (!foundProductOptionValue) {
          throw new BadRequestException(`Product option value with ID "${selectedOption.optionValueId}" does not exist`);
        }

        selectedOption.optionName = foundProductOption.name;
        selectedOption.optionValueName = foundProductOptionValue.name;
        selectedOption.priceDiff = this.getPriceDiffOfSelectedOptionValue(
          foundSelectedProductOptionValue,
          foundProductOptionValue,
        );
      }

      orderItem.productName = foundProduct.name;
      orderItem.photoUrl = foundProduct.photoUrl;
      orderItem.price = foundProduct.price;
      orderItem.cost = orderItem.selectedOptions.reduce((acc, option) => acc + option.priceDiff, orderItem.price);
    }

    const id = await this.getHighestOrderId();
    const totalCost = orderDto.orderItems.reduce((acc, item) => acc + item.cost, 0);
    const createdAtIso = orderDto.createdAtIso || new Date().toISOString();

    const order = await this.orderModel.create({
      ...orderDto,
      _id: id,
      totalCost: totalCost,
      createdAtIso: createdAtIso,
    });

    return order.toJSON();
  }

  async deleteOrder(orderId: string): Promise<Order> {
    const order = await this.orderModel.findByIdAndDelete(orderId).exec();
    return order?.toJSON();
  }

  private getPriceDiffOfSelectedOptionValue(
    selectedProductOptionValue: SelectedProductOptionValue,
    productOptionValue: ProductOptionValue,
  ) {
    return selectedProductOptionValue.isPriceDiffOverridden
      ? selectedProductOptionValue.priceDiff
      : productOptionValue.priceDiff;
  }

  private async getHighestOrderId(): Promise<number> {
    const orders = await this.orderModel.find().sort({ _id: -1 }).limit(1).exec();
    const currentHighestOrderId = orders[0]?._id || 0;
    return currentHighestOrderId + 1;
  }
}
