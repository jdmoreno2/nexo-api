import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { SubscribersModule } from '../subscribers/subscribers.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User, UsersHasRoles } from './entities/user.entity';
import { SubscriberExistsConstraint } from '../subscribers/decorators/subscriber.validator';
import { emailExistsConstraint, UserAlreadyExistsConstraint, UserExistsConstraint } from './decorators/user.validator';
import { RolesModule } from '../roles/roles.module';
import { IdentificationTypeModule } from '../identification_type/identification_type.module';
import { IdentificationTypeExistsConstraint } from '../identification_type/decorators/identification-type.validator';

@Module({
  controllers: [UsersController],
  providers: [
    UsersService,
    SubscriberExistsConstraint,
    UserAlreadyExistsConstraint,
    emailExistsConstraint,
    IdentificationTypeExistsConstraint,
    UserExistsConstraint
  ],
  imports: [
    SubscribersModule,
    RolesModule,
    IdentificationTypeModule,
    TypeOrmModule.forFeature([User, UsersHasRoles])
  ],
  exports: [UsersService, UserExistsConstraint],
})
export class UsersModule { }
