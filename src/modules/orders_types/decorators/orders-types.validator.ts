import { Injectable, NotFoundException, PipeTransform } from '@nestjs/common';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { OrdersTypesService } from '../orders_types.service';

@ValidatorConstraint({ name: 'orderTypesAlreadyExist', async: true })
@Injectable()
export class OrdersTypesAlreadyExistsConstraint implements ValidatorConstraintInterface {
  constructor(protected readonly ordersTypesService: OrdersTypesService) { }

  async validate(name: string, args: ValidationArguments) {
    const identificationTypeId = (args.object as any).id;
    const identificationType = await this.ordersTypesService.findOneByName(name);
    if (!identificationType) return true;
    if (identificationType) return identificationTypeId === identificationType.id;
    return false;
  }

  defaultMessage(args: ValidationArguments) {
    return `El Tipo de orden ${args.value} ya está registrada.`;
  }
}

@ValidatorConstraint({ name: 'ordersTypesExists', async: true })
@Injectable()
export class IdentificationTypeExistsConstraint implements ValidatorConstraintInterface {
  constructor(protected readonly ordersTypesService: OrdersTypesService) { }

  async validate(id: number) {
    const identificationType = await this.ordersTypesService.findOne(id)
    return !!identificationType;
  }

  defaultMessage(validationArguments: ValidationArguments): string {
    return `Tipo de orden con id: ${validationArguments.value} no encontrada.`;
  }
}

@Injectable()
export class OrdersTypesExistsPipe implements PipeTransform {
  constructor(private readonly ordersTypesService: OrdersTypesService) { }

  async transform(id: number) {
    const identificationType = await this.ordersTypesService.findOne(id);
    if (!identificationType) {
      throw new NotFoundException(`Tipo de orden con id: ${id} no encontrada.`);
    }
    return id;
  }
}

