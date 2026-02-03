import { Module } from '@nestjs/common';
import { IdentificationTypeService } from './identification_type.service';
import { IdentificationTypeController } from './identification_type.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IdentificationType } from './entities/identification_type.entity';
import {
  IdentificationTypeAlreadyExistsConstraint,
  IdentificationTypeExistsConstraint, IdentificationTypeExistsPipe
} from './decorators/identification-type.validator';

@Module({
  imports: [
    TypeOrmModule.forFeature([IdentificationType])
  ],
  controllers: [IdentificationTypeController],
  providers: [
    IdentificationTypeService,
    IdentificationTypeAlreadyExistsConstraint,
    IdentificationTypeExistsConstraint,
    IdentificationTypeExistsPipe
  ],
  exports: [IdentificationTypeService, IdentificationTypeExistsConstraint]
})
export class IdentificationTypeModule { }
