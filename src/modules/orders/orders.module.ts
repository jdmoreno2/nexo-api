import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { OrderExistsConstraint, OrdersAlreadyExistsConstraint, OrdersExistsPipe } from './decorators/orders.validator';
import { BranchesModule } from '../branches/branches.module';
import { OrdersTypesModule } from '../orders_types/orders_types.module';
import { BranchExistsConstraint } from '../branches/decorators/branches.validator';
import { OrdersTypesExistsConstraint } from '../orders_types/decorators/orders-types.validator';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order]),
    BranchesModule,
    OrdersTypesModule
  ],
  controllers: [OrdersController],
  providers: [
    OrdersService,
    OrdersAlreadyExistsConstraint,
    OrderExistsConstraint,
    OrdersExistsPipe,
    BranchExistsConstraint,
    OrdersTypesExistsConstraint
  ],
  exports: [OrdersService, OrderExistsConstraint]
})
export class OrdersModule { }
