import { forwardRef, Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';
import { PermissionsModule } from '../permissions/permissions.module';
import { SubscribersModule } from '../subscribers/subscribers.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Role]),
    forwardRef(() => PermissionsModule),
    SubscribersModule
  ],
  controllers: [RolesController],
  providers: [RolesService],
  exports: [RolesService],
})
export class RolesModule { }
