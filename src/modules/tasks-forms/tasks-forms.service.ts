import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateTasksFormDto } from './dto/request/create-tasks-form.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TasksForm } from './entities/tasks-form.entity';
import { Repository } from 'typeorm';
import { GenericResponsesDto } from 'src/common/dto/generic-response.dto';
import { ResponseFormsTasksListDto } from './dto/response/response-task-form-list.dto';

@Injectable()
export class TasksFormsService {
  constructor(
    @InjectRepository(TasksForm)
    private readonly tasksFormsRepository: Repository<TasksForm>
  ) { }

  async create(createTasksFormDto: CreateTasksFormDto): Promise<GenericResponsesDto> {
    if (!await this.tasksFormsRepository.save(createTasksFormDto)) {
      throw new BadRequestException('Error al crear el formulario de la Tarea')
    }
    return { message: 'Formulario de Tarea Creado Exitosamente', statusCode: 201, error: '' };
  }

  async findAll(tasks_id: number): Promise<ResponseFormsTasksListDto[]> {
    return await this.tasksFormsRepository.find({
      relations: {
        question: true,
        response: true,
      },
      select: {
        tasks_id: true,
        value: true,
        question: {
          id: true,
          name: true,
        },
        response: {
          id: true,
          value: true,
        }
      },
      where: { tasks_id },
    });
  }
}
