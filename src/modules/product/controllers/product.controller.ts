import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put, Request,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ProductService } from '../services/product.service';
import { CreateOrUpdateProductDto } from '../dtos/create-or-update-product.dto';
import { ProductDto } from '../dtos/product.dto';
import { toDto } from '../../../utils/to-dto.util';
import { ReorderProductsDto } from '../dtos/reorder-products.dto';
import { FastifyRequest } from 'fastify';
import { UploadedPhotoResponseDto } from '../../../dtos/uploaded-photo-response.dto';

@Controller('products')
@UsePipes(new ValidationPipe({ transform: true }))
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  async getAllProducts(): Promise<ProductDto[]> {
    const products = await this.productService.getAllProducts();
    return products.map(product => toDto(ProductDto, product));
  }

  @Get(':id')
  async getProduct(@Param('id') productId: string): Promise<ProductDto> {
    const product = await this.productService.getProduct(productId);
    if (!product) {
      throw new NotFoundException(`Product with id ${productId} not found`);
    }

    return toDto(ProductDto, product);
  }

  @Post()
  async create(@Body() productDto: CreateOrUpdateProductDto): Promise<ProductDto> {
    const product = await this.productService.create(productDto);
    return toDto(ProductDto, product);
  }

  @Post('reorder')
  async reorderProducts(@Body() reorderProductsDto: ReorderProductsDto): Promise<ProductDto[]> {
    const products = await this.productService.reorderProducts(reorderProductsDto);
    return products.map(product => toDto(ProductDto, product));
  }

  @Post('photo')
  async uploadPhoto(@Request() request: FastifyRequest): Promise<UploadedPhotoResponseDto> {
    const photoUrl = await this.productService.uploadPhoto(request);

    return { photoUrl };
  }

  @Put(':id')
  async update(@Param('id') productId: string, @Body() productDto: CreateOrUpdateProductDto): Promise<ProductDto> {
    const product = await this.productService.update(productId, productDto);
    if (!product) {
      throw new NotFoundException(`Product with id ${productId} not found`);
    }

    return toDto(ProductDto, product);
  }

  @Delete(':id')
  async deleteProduct(@Param('id') productId: string): Promise<ProductDto> {
    const product = await this.productService.deleteProduct(productId);
    if (!product) {
      throw new NotFoundException(`Product with id ${productId} not found`);
    }

    return toDto(ProductDto, product);
  }
}
