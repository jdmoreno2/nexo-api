import { forwardRef, Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role, RolesHasPermission } from './entities/role.entity';
import { PermissionsModule } from '../permissions/permissions.module';
import { SubscribersModule } from '../subscribers/subscribers.module';
import { SubscriberExistsConstraint } from '../subscribers/decorators/subscriber.validator';
import { PermissionExistsConstraint } from '../permissions/decorators/permission.validator';
import { RoleExistsConstraint, RoleExistsPipe, RolesAlreadyExistsConstraint } from './decorators/roles.validator';

@Module({
  imports: [
    TypeOrmModule.forFeature([Role, RolesHasPermission]),
    forwardRef(() => PermissionsModule),
    SubscribersModule
  ],
  controllers: [RolesController],
  providers: [
    RolesService,
    RolesAlreadyExistsConstraint,
    RoleExistsConstraint,
    RoleExistsPipe,
    SubscriberExistsConstraint,
    PermissionExistsConstraint,
  ],
  exports: [
    RolesService,
    RoleExistsConstraint
  ],
})
export class RolesModule { }
