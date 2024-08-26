import { Module } from '@nestjs/common';
import { OrderService } from './services/order.service';
import { OrderController } from './controllers/order.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Order, OrderSchema } from './schemas/order.schema';
import { ProductModule } from '../product/product.module';
import { IngredientModule } from '../ingredient/ingredient.module';
import { OrderReportService } from './services/order-report.service';
import { OrderReportController } from './controllers/order-report.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Order.name, schema: OrderSchema, collection: Order.collectionName },
    ]),
    ProductModule,
    IngredientModule,
  ],
  providers: [
    OrderService,
    OrderReportService,
  ],
  controllers: [
    OrderController,
    OrderReportController,
  ],
})
export class OrderModule {}
