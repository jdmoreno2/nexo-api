import { Module } from '@nestjs/common';
import { FormsService } from './forms.service';
import { FormsController } from './forms.controller';
import { FormAlreadyExistsConstraint, FormExistsConstraint, FormExistsPipe } from './decorators/forms.validator';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from '../orders/entities/order.entity';
import { SubscribersModule } from '../subscribers/subscribers.module';
import { SubscriberExistsConstraint } from '../subscribers/decorators/subscriber.validator';

@Module({
  imports: [TypeOrmModule.forFeature([Order]), SubscribersModule],
  controllers: [FormsController],
  providers: [
    FormsService,
    FormAlreadyExistsConstraint,
    FormExistsConstraint,
    FormExistsPipe,
    SubscriberExistsConstraint
  ],
  exports: [FormsService, FormExistsConstraint],
})
export class FormsModule { }
