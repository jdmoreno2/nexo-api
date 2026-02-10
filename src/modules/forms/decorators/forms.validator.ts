import { Injectable, NotFoundException, PipeTransform } from '@nestjs/common';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { FormsService } from '../forms.service';

@ValidatorConstraint({ name: 'formAlreadyExist', async: true })
@Injectable()
export class FormAlreadyExistsConstraint implements ValidatorConstraintInterface {
  constructor(protected readonly formsService: FormsService) { }

  async validate(name: string, args: ValidationArguments) {
    const formId = (args.object as any).id;
    const form = await this.formsService.findOneByName(name);
    if (!form) return true;
    if (form) return formId === form.id;
    return false;
  }

  defaultMessage(args: ValidationArguments) {
    return `El Formulario ${args.value} ya está registrado.`;
  }
}

@ValidatorConstraint({ name: 'formExists', async: true })
@Injectable()
export class FormExistsConstraint implements ValidatorConstraintInterface {
  constructor(protected readonly formsService: FormsService) { }

  async validate(id: number) {
    const form = await this.formsService.findOne(id)
    return !!form;
  }

  defaultMessage(validationArguments: ValidationArguments): string {
    return `Formulario con id: ${validationArguments.value} no encontrado.`;
  }
}

@Injectable()
export class FormExistsPipe implements PipeTransform {
  constructor(private readonly formsService: FormsService) { }

  async transform(id: number) {
    const form = await this.formsService.findOne(id);
    if (!form) {
      throw new NotFoundException(`Formulario con id: ${id} no encontrado.`);
    }
    return id;
  }
}

