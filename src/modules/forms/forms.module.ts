import { forwardRef, Module } from '@nestjs/common';
import { FormsService } from './forms.service';
import { FormsController } from './forms.controller';
import { FormAlreadyExistsConstraint, FormExistsConstraint, FormExistsPipe } from './decorators/forms.validator';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubscribersModule } from '../subscribers/subscribers.module';
import { SubscriberExistsConstraint } from '../subscribers/decorators/subscriber.validator';
import { Form } from './entities/form.entity';
import { QuestionsModule } from '../questions/questions.module';
import { OrdersTypesModule } from '../orders_types/orders_types.module';
import { OrdersTypesExistsConstraint } from '../orders_types/decorators/orders-types.validator';

@Module({
  imports: [
    TypeOrmModule.forFeature([Form]),
    SubscribersModule,
    forwardRef(() => QuestionsModule),
    OrdersTypesModule
  ],
  controllers: [FormsController],
  providers: [
    FormsService,
    FormAlreadyExistsConstraint,
    FormExistsConstraint,
    FormExistsPipe,
    SubscriberExistsConstraint,
    OrdersTypesExistsConstraint,
  ],
  exports: [FormsService, FormExistsConstraint],
})
export class FormsModule { }
