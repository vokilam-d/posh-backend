import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category } from '../schemas/category.schema';

@Injectable()
export class CategoryService implements OnApplicationBootstrap {
  constructor(
    @InjectModel(Category.name) private readonly categoryModel: Model<Category>
  ) {}

  onApplicationBootstrap(): any {
    const cat: Category = {
      id: null,
      name: 'my-cat',
      parentCategoryId: null,
      photoUrl: null,
    };
    this.categoryModel.create(cat);
  }
}
