import { forwardRef, Module } from '@nestjs/common';
import { PermissionsService } from './permissions.service';
import { PermissionsController } from './permissions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Permission } from './entities/permission.entity';
import { PermissionAlreadyExistsConstraint, PermissionExistsConstraint, PermissionExistsPipe } from './decorators/permission.validator';
import { RolesModule } from '../roles/roles.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Permission]),
    forwardRef(() => RolesModule)
  ],
  controllers: [PermissionsController],
  providers: [
    PermissionsService,
    PermissionAlreadyExistsConstraint,
    PermissionExistsPipe,
    PermissionExistsConstraint
  ],
  exports: [PermissionsService, PermissionExistsPipe, PermissionExistsConstraint],
})
export class PermissionsModule { }
