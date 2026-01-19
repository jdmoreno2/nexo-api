import { Module } from '@nestjs/common';
import { SubscribersService } from './subscribers.service';
import { SubscribersController } from './subscribers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Subscriber } from './entities/subscriber.entity';
import { subscriberAlreadyExistsConstraint, SubscriberExistsPipe } from './decorators/subscriber.validator';

@Module({
  imports: [
    TypeOrmModule.forFeature([Subscriber])
  ],
  controllers: [SubscribersController],
  providers: [
    SubscribersService,
    subscriberAlreadyExistsConstraint,
    SubscriberExistsPipe
  ],
  exports: [SubscribersService, SubscriberExistsPipe],
})
export class SubscribersModule { }
