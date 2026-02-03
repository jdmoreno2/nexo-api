import { Module } from '@nestjs/common';
import { IdentificationTypeService } from './identification_type.service';
import { IdentificationTypeController } from './identification_type.controller';

@Module({
  controllers: [IdentificationTypeController],
  providers: [IdentificationTypeService],
})
export class IdentificationTypeModule {}
