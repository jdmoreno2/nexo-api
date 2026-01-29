import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { SubscribersModule } from '../subscribers/subscribers.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { SubscriberExistsConstraint } from '../subscribers/decorators/subscriber.validator';
import { emailExistsConstraint, UserAlreadyExistsConstraint } from './decorators/user.validator';

@Module({
  controllers: [UsersController],
  providers: [
    UsersService,
    SubscriberExistsConstraint,
    UserAlreadyExistsConstraint,
    emailExistsConstraint
  ],
  imports: [
    SubscribersModule,
    TypeOrmModule.forFeature([User])
  ],
  exports: [UsersService],
})
export class UsersModule { }
