import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProductOption } from '../schemas/product-option.schema';
import { CreateOrUpdateProductOptionDto } from '../dtos/create-or-update-product-option.dto';

@Injectable()
export class ProductOptionService implements OnApplicationBootstrap {
  constructor(
    @InjectModel(ProductOption.name) private readonly productOptionModel: Model<ProductOption>
  ) {}

  onApplicationBootstrap(): any {
  }

  async getAllProductOptions(): Promise<ProductOption[]> {
    const productOptionDocs = await this.productOptionModel.find().sort().exec();
    return productOptionDocs.map(productOption => productOption.toJSON());
  }

  async getProductOption(productOptionId: string): Promise<ProductOption> {
    const productOption = await this.productOptionModel.findById(productOptionId).exec();
    return productOption?.toJSON();
  }

  async create(productOptionDto: CreateOrUpdateProductOptionDto): Promise<ProductOption> {
    const productOption = await this.productOptionModel.create(productOptionDto);
    return productOption.toJSON();
  }

  async update(productOptionId: string, productOptionDto: CreateOrUpdateProductOptionDto): Promise<ProductOption> {
    const productOption = await this.productOptionModel.findByIdAndUpdate(productOptionId, productOptionDto, { new: true }).exec();
    return productOption?.toJSON();
  }

  async deleteProductOption(productOptionId: string): Promise<ProductOption> {
    const productOption = await this.productOptionModel.findByIdAndDelete(productOptionId).exec();
    return productOption?.toJSON();
  }
}
