import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { config } from './config';
import { CategoryModule } from './modules/category/category.module';
import { ProductOptionModule } from './modules/product-option/product-option.module';
import { ProductModule } from './modules/product/product.module';
import { HealthModule } from './modules/health/health.module';
import { OrderModule } from './modules/order/order.module';

@Module({
  imports: [
    MongooseModule.forRoot(config.mongoUri, { retryDelay: 1 }),
    CategoryModule,
    ProductOptionModule,
    ProductModule,
    HealthModule,
    OrderModule,
  ],
})
export class AppModule {}
