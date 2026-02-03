import { Module } from '@nestjs/common';
import { EquipmentsService } from './equipments.service';
import { EquipmentsController } from './equipments.controller';
import { BranchesModule } from '../branches/branches.module';
import { BranchExistsConstraint } from '../branches/decorators/branches.validator';
import { EquipmentAlreadyExistsConstraint, EquipmentExistsConstraint, EquipmentExistsPipe } from './decorators/equipments.validator';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Equipment } from './entities/equipment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Equipment]), BranchesModule],
  controllers: [EquipmentsController],
  providers: [
    EquipmentsService,
    BranchExistsConstraint,
    EquipmentAlreadyExistsConstraint,
    EquipmentExistsConstraint,
    EquipmentExistsPipe
  ],
  exports: [EquipmentsService, EquipmentExistsConstraint]
})
export class EquipmentsModule { }
