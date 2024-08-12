import { Module } from '@nestjs/common';
import { OrderService } from './services/order.service';
import { OrderController } from './controllers/order.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Order, OrderSchema } from './schemas/order.schema';
import { ProductModule } from '../product/product.module';
import { IngredientModule } from '../ingredient/ingredient.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Order.name, schema: OrderSchema, collection: Order.collectionName },
    ]),
    ProductModule,
    IngredientModule,
  ],
  providers: [OrderService],
  controllers: [OrderController],
})
export class OrderModule {}
