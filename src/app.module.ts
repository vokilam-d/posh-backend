import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { config } from './config';
import { CategoryModule } from './modules/category/category.module';

@Module({
  imports: [
    MongooseModule.forRoot(config.mongoUri, { retryDelay: 1 }),
    CategoryModule,
  ],
})
export class AppModule {}
