import { Injectable, NotFoundException, PipeTransform } from '@nestjs/common';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { BranchesService } from '../branches.service';

@ValidatorConstraint({ name: 'branchAlreadyExist', async: true })
@Injectable()
export class BranchAlreadyExistsConstraint implements ValidatorConstraintInterface {
  constructor(protected readonly branchesService: BranchesService) { }

  async validate(name: string, args: ValidationArguments) {
    const branchId = (args.object as any).id;
    const branch = await this.branchesService.findOneByName(name);
    if (!branch) return true;
    if (branch) return branchId === branch.id;
    return false;
  }

  defaultMessage(args: ValidationArguments) {
    return `El Sucursal ${args.value} ya está registrada.`;
  }
}

@ValidatorConstraint({ name: 'branchExists', async: true })
@Injectable()
export class BranchExistsConstraint implements ValidatorConstraintInterface {
  constructor(protected readonly branchesService: BranchesService) { }

  async validate(id: number) {
    const branch = await this.branchesService.findOne(id)
    return !!branch;
  }

  defaultMessage(validationArguments: ValidationArguments): string {
    return `Sucursal con id: ${validationArguments.value} no encontrada.`;
  }
}

@Injectable()
export class BranchExistsPipe implements PipeTransform {
  constructor(private readonly branchesService: BranchesService) { }

  async transform(id: number) {
    const branch = await this.branchesService.findOne(id);
    if (!branch) {
      throw new NotFoundException(`Sucursal con id: ${id} no encontrada.`);
    }
    return id;
  }
}

