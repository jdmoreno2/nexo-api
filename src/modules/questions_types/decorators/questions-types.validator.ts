import { Injectable, NotFoundException, PipeTransform } from '@nestjs/common';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { QuestionsTypesService } from '../questions_types.service';

@ValidatorConstraint({ name: 'questionsTypesAlreadyExist', async: true })
@Injectable()
export class QuestionsTypesAlreadyExistsConstraint implements ValidatorConstraintInterface {
  constructor(protected readonly questionsTypesService: QuestionsTypesService) { }

  async validate(name: string, args: ValidationArguments) {
    const questionTypeId = (args.object as any).id;
    const questionType = await this.questionsTypesService.findOneByName(name);
    if (!questionType) return true;
    if (questionType) return questionTypeId === questionType.id;
    return false;
  }

  defaultMessage(args: ValidationArguments) {
    return `El Tipo de Pregunta ${args.value} ya está registrada.`;
  }
}

@ValidatorConstraint({ name: 'questionsTypesExists', async: true })
@Injectable()
export class QuestionsTypesExistsConstraint implements ValidatorConstraintInterface {
  constructor(protected readonly questionsTypesService: QuestionsTypesService) { }

  async validate(id: number) {
    const questionType = await this.questionsTypesService.findOne(id)
    return !!questionType;
  }

  defaultMessage(validationArguments: ValidationArguments): string {
    return `Tipo de Pregunta con id: ${validationArguments.value} no encontrada.`;
  }
}

@Injectable()
export class QuestionsTypesExistsPipe implements PipeTransform {
  constructor(private readonly questionsTypesService: QuestionsTypesService) { }

  async transform(id: number) {
    const questionType = await this.questionsTypesService.findOne(id);
    if (!questionType) {
      throw new NotFoundException(`Tipo de Pregunta con id: ${id} no encontrada.`);
    }
    return id;
  }
}

