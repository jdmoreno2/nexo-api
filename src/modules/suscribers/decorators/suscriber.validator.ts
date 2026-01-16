import { Injectable, NotFoundException, PipeTransform } from '@nestjs/common';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { SuscribersService } from '../suscribers.service';

@ValidatorConstraint({ name: 'suscriberAlreadyExists', async: true })
@Injectable()
export class suscriberAlreadyExistsConstraint implements ValidatorConstraintInterface {
  constructor(protected readonly suscribersService: SuscribersService) { }

  async validate(nit: string, args: ValidationArguments) {
    const obj = args.object as any;
    const sucriberId = obj.id;
    const suscriber = await this.suscribersService.findOneByNit(nit);
    if (!suscriber) return true;
    if (sucriberId) return suscriber.id == sucriberId;
    return false;
  }

  defaultMessage(args: ValidationArguments) {
    return `El nit ${args.value} ya está registrado.`;
  }
}


@Injectable()
export class SuscriberExistsPipe implements PipeTransform {
  constructor(private readonly suscribersService: SuscribersService) { }

  async transform(id: number) {
    const suscriber = await this.suscribersService.findOne(id);
    if (!suscriber) {
      throw new NotFoundException(`Suscriptor con id: ${id} no encontrado.`);
    }
    return id;
  }
}