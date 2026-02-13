import { Injectable, NotFoundException, PipeTransform } from '@nestjs/common';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { TasksService } from '../tasks.service';

@ValidatorConstraint({ name: 'tasksExists', async: true })
@Injectable()
export class TasksExistsConstraint implements ValidatorConstraintInterface {
  constructor(protected readonly tasksService: TasksService) { }

  async validate(id: number) {
    const task = await this.tasksService.findOne(id)
    return !!task;
  }

  defaultMessage(validationArguments: ValidationArguments): string {
    return `Tarea con id: ${validationArguments.value} no encontrada.`;
  }
}

@Injectable()
export class TasksExistsPipe implements PipeTransform {
  constructor(private readonly tasksService: TasksService) { }

  async transform(id: number) {
    const task = await this.tasksService.findOne(id);
    if (!task) {
      throw new NotFoundException(`Tarea con id: ${id} no encontrada.`);
    }
    return id;
  }
}

