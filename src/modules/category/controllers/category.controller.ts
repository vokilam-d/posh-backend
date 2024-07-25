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
  Request,
} from '@nestjs/common';
import { CategoryService } from '../services/category.service';
import { CreateOrUpdateCategoryDto } from '../dtos/create-or-update-category.dto';
import { CategoryDto } from '../dtos/category.dto';
import { toDto } from '../../../utils/to-dto.util';
import { ReorderCategoriesDto } from '../dtos/reorder-categories.dto';
import { FastifyRequest } from 'fastify';
import { UploadedPhotoResponseDto } from '../../../dtos/uploaded-photo-response.dto';

@Controller('categories')
@UsePipes(new ValidationPipe({ transform: true }))
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  async getAllCategories(): Promise<CategoryDto[]> {
    const categories = await this.categoryService.getAllCategories();
    return categories.map(category => toDto(CategoryDto, category));
  }

  @Get(':id')
  async getCategory(@Param('id') categoryId: string): Promise<CategoryDto> {
    const category = await this.categoryService.getCategory(categoryId);
    if (!category) {
      throw new NotFoundException(`Category with id ${categoryId} not found`);
    }

    return toDto(CategoryDto, category);
  }

  @Post()
  async create(@Body() categoryDto: CreateOrUpdateCategoryDto): Promise<CategoryDto> {
    const category = await this.categoryService.create(categoryDto);
    return toDto(CategoryDto, category);
  }

  @Post('reorder')
  async reorderCategories(@Body() reorderCategoriesDto: ReorderCategoriesDto): Promise<CategoryDto[]> {
    const categories = await this.categoryService.reorderCategories(reorderCategoriesDto);
    return categories.map(category => toDto(CategoryDto, category));
  }

  @Post('photo')
  async uploadPhoto(@Request() request: FastifyRequest): Promise<UploadedPhotoResponseDto> {
    const photoUrl = await this.categoryService.uploadPhoto(request);

    return { photoUrl };
  }

  @Put(':id')
  async update(@Param('id') categoryId: string, @Body() categoryDto: CreateOrUpdateCategoryDto): Promise<CategoryDto> {
    const category = await this.categoryService.update(categoryId, categoryDto);
    if (!category) {
      throw new NotFoundException(`Category with id ${categoryId} not found`);
    }

    return toDto(CategoryDto, category);
  }

  @Delete(':id')
  async deleteCategory(@Param('id') categoryId: string): Promise<CategoryDto> {
    const category = await this.categoryService.deleteCategory(categoryId);
    if (!category) {
      throw new NotFoundException(`Category with id ${categoryId} not found`);
    }

    return toDto(CategoryDto, category);
  }
}
