import { Module } from '@nestjs/common';
import { BranchesService } from './branches.service';
import { BranchesController } from './branches.controller';
import { ClientsModule } from '../clients/clients.module';
import { ClientExistsConstraint } from '../clients/decorators/clients.validator';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Branch } from './entities/branch.entity';
import { BranchAlreadyExistsConstraint, BranchExistsConstraint, BranchExistsPipe } from './decorators/branches.validator';

@Module({
  imports: [
    ClientsModule,
    TypeOrmModule.forFeature([Branch]),
  ],
  controllers: [BranchesController],
  providers: [
    BranchesService,
    ClientExistsConstraint,
    BranchAlreadyExistsConstraint,
    BranchExistsConstraint,
    BranchExistsPipe
  ],
  exports: [BranchesService]
})
export class BranchesModule { }
