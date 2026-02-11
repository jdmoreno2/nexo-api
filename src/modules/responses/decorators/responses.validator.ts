import { Injectable, NotFoundException, PipeTransform } from '@nestjs/common';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { ResponsesService } from '../responses.service';

@ValidatorConstraint({ name: 'responsesExists', async: true })
@Injectable()
export class ResponsesExistsConstraint implements ValidatorConstraintInterface {
  constructor(protected readonly responsesService: ResponsesService) { }

  async validate(id: number) {
    const question = await this.responsesService.findOne(id)
    return !!question;
  }

  defaultMessage(validationArguments: ValidationArguments): string {
    return `Respuesta con id: ${validationArguments.value} no encontrada.`;
  }
}

@Injectable()
export class ResponsesExistsPipe implements PipeTransform {
  constructor(private readonly responsesService: ResponsesService) { }

  async transform(id: number) {
    const question = await this.responsesService.findOne(id);
    if (!question) {
      throw new NotFoundException(`Respuesta con id: ${id} no encontrada.`);
    }
    return id;
  }
}

