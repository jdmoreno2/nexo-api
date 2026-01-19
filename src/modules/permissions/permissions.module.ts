import { forwardRef, Module } from '@nestjs/common';
import { PermissionsService } from './permissions.service';
import { PermissionsController } from './permissions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Permission } from './entities/permission.entity';
import { PermissionAlreadyExistsConstraint, PermissionExistsPipe } from './decorators/permission.validator';
import { RolesModule } from '../roles/roles.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Permission]),
    forwardRef(() => RolesModule)
  ],
  controllers: [PermissionsController],
  providers: [PermissionsService, PermissionAlreadyExistsConstraint, PermissionExistsPipe],
  exports: [PermissionsService, PermissionExistsPipe],
})
export class PermissionsModule { }
