import { Injectable, NotFoundException, PipeTransform } from '@nestjs/common';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { QuestionsService } from '../questions.service';

@ValidatorConstraint({ name: 'questionsExists', async: true })
@Injectable()
export class QuestionsExistsConstraint implements ValidatorConstraintInterface {
  constructor(protected readonly questionsService: QuestionsService) { }

  async validate(id: number) {
    const question = await this.questionsService.findOne(id)
    return !!question;
  }

  defaultMessage(validationArguments: ValidationArguments): string {
    return `Pregunta con id: ${validationArguments.value} no encontrada.`;
  }
}

@Injectable()
export class QuestionsExistsPipe implements PipeTransform {
  constructor(private readonly questionsService: QuestionsService) { }

  async transform(id: number) {
    const question = await this.questionsService.findOne(id);
    if (!question) {
      throw new NotFoundException(`Pregunta con id: ${id} no encontrada.`);
    }
    return id;
  }
}

