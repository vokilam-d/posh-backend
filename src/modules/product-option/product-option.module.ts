import { Module } from '@nestjs/common';
import { ProductOptionService } from './services/product-option.service';
import { ProductOptionController } from './controllers/product-option.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductOption, ProductOptionSchema } from './schemas/product-option.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ProductOption.name, schema: ProductOptionSchema, collection: 'product-options' },
    ]),
  ],
  providers: [ProductOptionService],
  controllers: [ProductOptionController]
})
export class ProductOptionModule {}
