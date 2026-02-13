import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/request/create-task.dto';
import { UpdateTaskDto } from './dto/request/update-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { ILike, Repository } from 'typeorm';
import { GenericResponsesDto } from 'src/common/dto/generic-response.dto';
import { PaginationDto, PaginationRequestMetaDto } from 'src/common/dto/pagination-response.dto';
import { ResponseTaskListDto } from './dto/response/response-task-list.dto';
import { ResponseTaskDto } from './dto/response/response-task.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly tasksRepository: Repository<Task>
  ) { }

  async create(createTaskDto: CreateTaskDto): Promise<GenericResponsesDto> {
    if (!await this.tasksRepository.save(createTaskDto)) {
      throw new BadRequestException('Error al crear la Tarea')
    }
    return { message: 'Tarea Creado Exitosamente', statusCode: 201, error: '' };
  }

  async findAll(meta: PaginationRequestMetaDto): Promise<PaginationDto<ResponseTaskListDto>> {
    const page = meta?.page || 1;
    const limit = meta?.limit || 10;
    const skit = (page - 1) * limit;

    const [result, total] = await this.tasksRepository.findAndCount({
      relations: {
        equipment: true,
        user: true,
      },
      select: {
        id: true,
        description: true,
        start_date: true,
        end_date: true,
        status: true,
        created_at: true,
        equipment: {
          id: true,
          serial: true,
        },
        user: {
          id: true,
          name: true,
          lastname: true,
        }
      },
      where: meta.search ? [
        {
          description: ILike(`%${meta.search}%`)
        },
        {
          equipment: {
            serial: ILike(`%${meta.search}%`)
          }
        },
        {
          user: {
            name: ILike(`%${meta.search}%`),
            lastname: ILike(`%${meta.search}%`)
          }
        },
      ] : {},
      order: {
        [meta.orderBy || 'id']: meta.order || 'ASC'
      },
      skip: skit,
      take: limit
    });

    return {
      data: result,
      meta: {
        page: +page,
        limit: +limit,
        total: total,
        totalPages: Math.ceil(total / limit)
      }
    };
  }

  async findOne(id: number): Promise<ResponseTaskDto | null> {
    return this.tasksRepository.findOne({
      relations: {
        equipment: true,
        user: true,
      },
      where: { id },
      select: {
        id: true,
        description: true,
        start_date: true,
        end_date: true,
        status: true,
        orders_id: true,
        equipments_id: true,
        users_id: true,
        equipment: {
          id: true,
          serial: true,
        },
        user: {
          id: true,
          name: true,
          lastname: true,
        }
      }
    },);
  }

  async update(id: number, updateTaskDto: UpdateTaskDto): Promise<GenericResponsesDto> {
    console.log(updateTaskDto);

    const updatedTask = await this.tasksRepository.update(id, updateTaskDto);
    if (updatedTask.affected === 0) throw new BadRequestException('Error al actualizar la Tarea');
    return { message: 'Tarea Actualizada', statusCode: 200, error: '' };
  }

  async remove(id: number): Promise<GenericResponsesDto> {
    const removedTask = await this.tasksRepository.update(id, { status: 0 });
    if (removedTask.affected === 0) throw new BadRequestException('Error al eliminar la Tarea');
    return { message: 'Tarea Eliminada', statusCode: 200, error: '' };
  }
}
