import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { config } from './config';
import { CategoryModule } from './modules/category/category.module';
import { ProductOptionModule } from './modules/product-option/product-option.module';

@Module({
  imports: [
    MongooseModule.forRoot(config.mongoUri, { retryDelay: 1 }),
    CategoryModule,
    ProductOptionModule,
  ],
})
export class AppModule {}
