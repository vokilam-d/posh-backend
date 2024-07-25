import { Module } from '@nestjs/common';
import { ProductService } from './services/product.service';
import { ProductController } from './controllers/product.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from './schemas/product.schema';
import { PhotoUploadModule } from '../photo-upload/photo-upload.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Product.name, schema: ProductSchema, collection: Product.collectionName },
    ]),
    PhotoUploadModule,
  ],
  providers: [ProductService],
  controllers: [ProductController],
})
export class ProductModule {}
