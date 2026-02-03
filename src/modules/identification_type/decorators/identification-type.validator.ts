import { Injectable, NotFoundException, PipeTransform } from '@nestjs/common';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { IdentificationTypeService } from '../identification_type.service';

@ValidatorConstraint({ name: 'identificationTypeAlreadyExist', async: true })
@Injectable()
export class IdentificationTypeAlreadyExistsConstraint implements ValidatorConstraintInterface {
  constructor(protected readonly identificationTypeService: IdentificationTypeService) { }

  async validate(name: string, args: ValidationArguments) {
    const identificationTypeId = (args.object as any).id;
    const identificationType = await this.identificationTypeService.findOneByName(name);
    if (!identificationType) return true;
    if (identificationType) return identificationTypeId === identificationType.id;
    return false;
  }

  defaultMessage(args: ValidationArguments) {
    return `El Tipo de identificacion ${args.value} ya está registrada.`;
  }
}

@ValidatorConstraint({ name: 'identificationTypeExists', async: true })
@Injectable()
export class IdentificationTypeExistsConstraint implements ValidatorConstraintInterface {
  constructor(protected readonly identificationTypeService: IdentificationTypeService) { }

  async validate(id: number) {
    const identificationType = await this.identificationTypeService.findOne(id)
    return !!identificationType;
  }

  defaultMessage(validationArguments: ValidationArguments): string {
    return `Tipo de identificacion con id: ${validationArguments.value} no encontrada.`;
  }
}

@Injectable()
export class IdentificationTypeExistsPipe implements PipeTransform {
  constructor(private readonly identificationTypeService: IdentificationTypeService) { }

  async transform(id: number) {
    const identificationType = await this.identificationTypeService.findOne(id);
    if (!identificationType) {
      throw new NotFoundException(`Tipo de identificacion con id: ${id} no encontrada.`);
    }
    return id;
  }
}

