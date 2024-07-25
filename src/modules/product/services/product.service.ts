import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from '../schemas/product.schema';
import { CreateOrUpdateProductDto } from '../dtos/create-or-update-product.dto';
import { ReorderProductsDto } from '../dtos/reorder-products.dto';
import { FastifyRequest } from 'fastify';
import { PhotoUploadService } from '../../photo-upload/services/photo-upload.service';

@Injectable()
export class ProductService implements OnApplicationBootstrap {
  constructor(
    @InjectModel(Product.name) private readonly productModel: Model<Product>,
    private readonly photoService: PhotoUploadService,
  ) {}

  onApplicationBootstrap(): any {
  }

  async getAllProducts(): Promise<Product[]> {
    const sortOrderKey: keyof Product = 'sortOrder';

    const productDocs = await this.productModel.find().sort({ [sortOrderKey]: 'asc' }).exec();
    return productDocs.map(product => product.toJSON());
  }

  async getProduct(productId: string): Promise<Product> {
    const product = await this.productModel.findById(productId).exec();
    return product?.toJSON();
  }

  async create(productDto: CreateOrUpdateProductDto): Promise<Product> {
    const highestSortOrder = await this.calcHighestSortOrder();
    const product = await this.productModel.create({
      ...productDto,
      sortOrder: highestSortOrder,
    });
    return product.toJSON();
  }

  async update(productId: string, productDto: CreateOrUpdateProductDto): Promise<Product> {
    const product = await this.productModel.findByIdAndUpdate(productId, productDto, { new: true }).exec();
    return product?.toJSON();
  }

  async deleteProduct(productId: string): Promise<Product> {
    const product = await this.productModel.findByIdAndDelete(productId).exec();
    return product?.toJSON();
  }

  async reorderProducts(reorderProductsDto: ReorderProductsDto): Promise<Product[]> {
    const ids = reorderProductsDto.products.map(product => product.id);
    const products = await this.productModel.find({ _id: { $in: ids } }).exec();

    for (const product of products) {
      const productDto = reorderProductsDto.products.find(productDto => productDto.id === product.id);
      product.sortOrder = productDto.newSortOrder;
    }

    await this.productModel.bulkSave(products);

    return this.getAllProducts();
  }

  async uploadPhoto(request: FastifyRequest): Promise<string> {
    return this.photoService.upload(request, Product.collectionName);
  }

  private async calcHighestSortOrder(): Promise<number> {
    const sortOrderKey: keyof Product = 'sortOrder';
    const products = await this.productModel.find().sort({ [sortOrderKey]: 'desc' }).limit(1).exec();

    return products[0]
      ? products[0].sortOrder + 1
      : 0;
  }
}
