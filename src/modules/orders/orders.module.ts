import { forwardRef, Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { OrderExistsConstraint, OrdersExistsPipe } from './decorators/orders.validator';
import { BranchesModule } from '../branches/branches.module';
import { OrdersTypesModule } from '../orders_types/orders_types.module';
import { BranchExistsConstraint } from '../branches/decorators/branches.validator';
import { OrdersTypesExistsConstraint } from '../orders_types/decorators/orders-types.validator';
import { UsersModule } from '../users/users.module';
import { EquipmentsModule } from '../equipments/equipments.module';
import { EquipmentExistsConstraint } from '../equipments/decorators/equipments.validator';
import { UserExistsConstraint } from '../users/decorators/user.validator';
import { TasksModule } from '../tasks/tasks.module';
import { Task } from '../tasks/entities/task.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order, Task]),
    BranchesModule,
    OrdersTypesModule,
    UsersModule,
    EquipmentsModule,
    forwardRef(() => TasksModule)
  ],
  controllers: [OrdersController],
  providers: [
    OrdersService,
    OrderExistsConstraint,
    OrdersExistsPipe,
    BranchExistsConstraint,
    OrdersTypesExistsConstraint,
    EquipmentExistsConstraint,
    UserExistsConstraint
  ],
  exports: [OrdersService, OrderExistsConstraint]
})
export class OrdersModule { }
