import { Module } from '@nestjs/common';
import { SubscribersService } from './subscribers.service';
import { SubscribersController } from './subscribers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Subscriber } from './entities/subscriber.entity';
import { subscriberAlreadyExistsConstraint, SubscriberExistsConstraint, SubscriberExistsPipe } from './decorators/subscriber.validator';

@Module({
  imports: [
    TypeOrmModule.forFeature([Subscriber])
  ],
  controllers: [SubscribersController],
  providers: [
    SubscribersService,
    subscriberAlreadyExistsConstraint,
    SubscriberExistsPipe,
    SubscriberExistsConstraint
  ],
  exports: [
    SubscribersService,
    SubscriberExistsConstraint
  ]
})
export class SubscribersModule { }
