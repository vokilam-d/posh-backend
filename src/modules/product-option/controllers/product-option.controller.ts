import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ProductOptionService } from '../services/product-option.service';
import { CreateOrUpdateProductOptionDto } from '../dtos/create-or-update-product-option.dto';
import { ProductOptionDto } from '../dtos/product-option.dto';
import { toDto } from '../../../utils/to-dto.util';

@Controller('product-options')
@UsePipes(new ValidationPipe({ transform: true }))
export class ProductOptionController {
  constructor(private readonly productOptionService: ProductOptionService) {}

  @Get()
  async getAllProductOptions(): Promise<ProductOptionDto[]> {
    const productOptions = await this.productOptionService.getAllProductOptions();
    return productOptions.map(productOption => toDto(ProductOptionDto, productOption));
  }

  @Get(':id')
  async getProductOption(@Param('id') productOptionId: string): Promise<ProductOptionDto> {
    const productOption = await this.productOptionService.getProductOption(productOptionId);
    if (!productOption) {
      throw new NotFoundException(`ProductOption with id ${productOptionId} not found`);
    }

    return toDto(ProductOptionDto, productOption);
  }

  @Post()
  async create(@Body() productOptionDto: CreateOrUpdateProductOptionDto): Promise<ProductOptionDto> {
    const productOption = await this.productOptionService.create(productOptionDto);
    return toDto(ProductOptionDto, productOption);
  }

  @Put(':id')
  async update(@Param('id') productOptionId: string, @Body() productOptionDto: CreateOrUpdateProductOptionDto): Promise<ProductOptionDto> {
    const productOption = await this.productOptionService.update(productOptionId, productOptionDto);
    if (!productOption) {
      throw new NotFoundException(`ProductOption with id ${productOptionId} not found`);
    }

    return toDto(ProductOptionDto, productOption);
  }

  @Delete(':id')
  async deleteProductOption(@Param('id') productOptionId: string): Promise<ProductOptionDto> {
    const productOption = await this.productOptionService.deleteProductOption(productOptionId);
    if (!productOption) {
      throw new NotFoundException(`ProductOption with id ${productOptionId} not found`);
    }

    return toDto(ProductOptionDto, productOption);
  }
}
