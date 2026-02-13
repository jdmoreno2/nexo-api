import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { UsersModule } from '../users/users.module';
import { EquipmentsModule } from '../equipments/equipments.module';
import { OrdersModule } from '../orders/orders.module';
import { TasksExistsConstraint, TasksExistsPipe } from './decorators/task.validator';

@Module({
  imports: [
    TypeOrmModule.forFeature([Task]),
    UsersModule,
    EquipmentsModule,
    OrdersModule
  ],
  controllers: [TasksController],
  providers: [TasksService, TasksExistsConstraint, TasksExistsPipe],
  exports: [TasksService, TasksExistsConstraint]
})
export class TasksModule { }
