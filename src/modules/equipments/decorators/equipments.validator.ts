import { Injectable, NotFoundException, PipeTransform } from '@nestjs/common';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { EquipmentsService } from '../equipments.service';

@ValidatorConstraint({ name: 'equipmentAlreadyExist', async: true })
@Injectable()
export class EquipmentAlreadyExistsConstraint implements ValidatorConstraintInterface {
  constructor(protected readonly equipmentsService: EquipmentsService) { }

  async validate(serial: string, args: ValidationArguments) {
    const equipmentId = (args.object as any).id;
    const equipment = await this.equipmentsService.findOneBySerial(serial);
    if (!equipment) return true;
    if (equipment) return equipmentId === equipment.id;
    return false;
  }

  defaultMessage(args: ValidationArguments) {
    return `El equipo ${args.value} ya está registrada.`;
  }
}

@ValidatorConstraint({ name: 'equipmentExists', async: true })
@Injectable()
export class EquipmentExistsConstraint implements ValidatorConstraintInterface {
  constructor(protected readonly equipmentsService: EquipmentsService) { }

  async validate(id: number) {
    const equipment = await this.equipmentsService.findOne(id)
    return !!equipment;
  }

  defaultMessage(validationArguments: ValidationArguments): string {
    return `equipo con id: ${validationArguments.value} no encontrado.`;
  }
}

@Injectable()
export class EquipmentExistsPipe implements PipeTransform {
  constructor(private readonly equipmentsService: EquipmentsService) { }

  async transform(id: number) {
    const equipment = await this.equipmentsService.findOne(id);
    if (!equipment) {
      throw new NotFoundException(`equipo con id: ${id} no encontrado.`);
    }
    return id;
  }
}

