import { Module } from '@nestjs/common';
import { FormsService } from './forms.service';
import { FormsController } from './forms.controller';
import { FormAlreadyExistsConstraint, FormExistsConstraint, FormExistsPipe } from './decorators/forms.validator';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubscribersModule } from '../subscribers/subscribers.module';
import { SubscriberExistsConstraint } from '../subscribers/decorators/subscriber.validator';
import { Form } from './entities/form.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Form]), SubscribersModule],
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
