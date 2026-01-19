import { Injectable, NotFoundException, PipeTransform } from '@nestjs/common';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { SubscribersService } from '../subscribers.service';

@ValidatorConstraint({ name: 'suscriberAlreadyExists', async: true })
@Injectable()
export class subscriberAlreadyExistsConstraint implements ValidatorConstraintInterface {
  constructor(protected readonly subscribersService: SubscribersService) { }

  async validate(nit: string, args: ValidationArguments) {
    const obj = args.object as any;
    const sucriberId = obj.id;
    const suscriber = await this.subscribersService.findOneByNit(nit);
    if (!suscriber) return true;
    if (sucriberId) return suscriber.id == sucriberId;
    return false;
  }

  defaultMessage(args: ValidationArguments) {
    return `El nit ${args.value} ya está registrado.`;
  }
}


@Injectable()
export class SubscriberExistsPipe implements PipeTransform {
  constructor(private readonly subscribersService: SubscribersService) { }

  async transform(id: number) {
    const subscriber = await this.subscribersService.findOne(id);
    if (!subscriber) {
      throw new NotFoundException(`Suscriptor con id: ${id} no encontrado.`);
    }
    return id;
  }
}