import { Module } from '@nestjs/common';
import { OrdersTypesService } from './orders_types.service';
import { OrdersTypesController } from './orders_types.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdersType } from './entities/orders_type.entity';
import { SubscribersModule } from '../subscribers/subscribers.module';
import { OrdersTypesExistsConstraint, OrdersTypesAlreadyExistsConstraint, OrdersTypesExistsPipe } from './decorators/orders-types.validator';
import { SubscriberExistsConstraint } from '../subscribers/decorators/subscriber.validator';

@Module({
  imports: [TypeOrmModule.forFeature([OrdersType]), SubscribersModule],
  controllers: [OrdersTypesController],
  providers: [
    OrdersTypesService,
    OrdersTypesAlreadyExistsConstraint,
    OrdersTypesExistsConstraint,
    OrdersTypesExistsPipe,
    SubscriberExistsConstraint
  ],
  exports: [
    OrdersTypesService,
    OrdersTypesExistsConstraint
  ],
})
export class OrdersTypesModule { }
