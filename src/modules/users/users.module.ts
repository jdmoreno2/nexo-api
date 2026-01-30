import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { SubscribersModule } from '../subscribers/subscribers.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User, UsersHasRoles } from './entities/user.entity';
import { SubscriberExistsConstraint } from '../subscribers/decorators/subscriber.validator';
import { emailExistsConstraint, UserAlreadyExistsConstraint } from './decorators/user.validator';
import { RolesModule } from '../roles/roles.module';

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
    RolesModule,
    TypeOrmModule.forFeature([User, UsersHasRoles])
  ],
  exports: [UsersService],
})
export class UsersModule { }
