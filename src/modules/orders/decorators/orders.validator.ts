import { Injectable, NotFoundException, PipeTransform } from '@nestjs/common';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { OrdersService } from '../orders.service';

@ValidatorConstraint({ name: 'ordersExists', async: true })
@Injectable()
export class OrderExistsConstraint implements ValidatorConstraintInterface {
  constructor(protected readonly ordersService: OrdersService) { }

  async validate(id: number) {
    const order = await this.ordersService.findOne(id)
    return !!order;
  }

  defaultMessage(validationArguments: ValidationArguments): string {
    return `Orden con id: ${validationArguments.value} no encontrada.`;
  }
}

@Injectable()
export class OrdersExistsPipe implements PipeTransform {
  constructor(private readonly ordersService: OrdersService) { }

  async transform(id: number) {
    const order = await this.ordersService.findOne(id);
    if (!order) {
      throw new NotFoundException(`Orden con id: ${id} no encontrada.`);
    }
    return id;
  }
}

