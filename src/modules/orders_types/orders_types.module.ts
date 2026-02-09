import { Module } from '@nestjs/common';
import { OrdersTypesService } from './orders_types.service';
import { OrdersTypesController } from './orders_types.controller';

@Module({
  controllers: [OrdersTypesController],
  providers: [OrdersTypesService],
})
export class OrdersTypesModule {}
