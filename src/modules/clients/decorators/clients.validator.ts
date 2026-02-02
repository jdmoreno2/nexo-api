import { Injectable, NotFoundException, PipeTransform } from '@nestjs/common';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { ClientsService } from '../clients.service';

@ValidatorConstraint({ name: 'clientAlreadyExist', async: true })
@Injectable()
export class ClientAlreadyExistsConstraint implements ValidatorConstraintInterface {
  constructor(protected readonly clientsService: ClientsService) { }

  async validate(nit: string, args: ValidationArguments) {
    const clientId = (args.object as any).id;
    const client = await this.clientsService.findOneByNit(nit);
    if (!client) return true;
    if (client) return clientId === client.id;
    return false;
  }

  defaultMessage(args: ValidationArguments) {
    return `El cliente ${args.value} ya está registrado.`;
  }
}

@ValidatorConstraint({ name: 'clientExists', async: true })
@Injectable()
export class ClientExistsConstraint implements ValidatorConstraintInterface {
  constructor(protected readonly clientsService: ClientsService) { }

  async validate(id: number) {
    const client = await this.clientsService.findOne(id)
    return !!client;
  }

  defaultMessage(validationArguments: ValidationArguments): string {
    return `Cliente con id: ${validationArguments.value} no encontrado.`;
  }
}

@Injectable()
export class ClientExistsPipe implements PipeTransform {
  constructor(private readonly clientsService: ClientsService) { }

  async transform(id: number) {
    const client = await this.clientsService.findOne(id);
    if (!client) {
      throw new NotFoundException(`Cliente con id: ${id} no encontrado.`);
    }
    return id;
  }
}

