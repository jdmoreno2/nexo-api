import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/request/create-order.dto';
import { UpdateOrderDto } from './dto/request/update-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { ILike, In, Not, Repository } from 'typeorm';
import { GenericResponsesDto } from 'src/common/dto/generic-response.dto';
import { ResponseOrdersDto } from './dto/response/response-orders.dto';
import { PaginationDto, PaginationRequestMetaDto } from 'src/common/dto/pagination-response.dto';
import { Task } from '../tasks/entities/task.entity';
import { CreateTaskDto } from '../tasks/dto/request/create-task.dto';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly ordersRepository: Repository<Order>,
    @InjectRepository(Task)
    private readonly tasksRepository: Repository<Task>,
  ) { }

  async getOrderNumber(branches_id: number): Promise<number> {
    const lastOrder = await this.ordersRepository
      .createQueryBuilder('order')
      .innerJoinAndSelect('order.branch', 'branch')
      .innerJoinAndSelect('branch.client', 'client')
      .where('client.subscribers_id = (SELECT c.subscribers_id FROM client c WHERE c.id = (SELECT clients_id FROM branch WHERE id = :branches_id))')
      .setParameter('branches_id', branches_id)
      .orderBy('order.order_number', 'DESC')
      .take(1)
      .getOne();

    return lastOrder ? lastOrder.order_number + 1 : 1;
  }

  async create(createOrderDto: CreateOrderDto): Promise<GenericResponsesDto> {
    const orderNumber = await this.getOrderNumber(createOrderDto.branches_id);
    const order = await this.ordersRepository.save({ ...createOrderDto, order_number: orderNumber });
    if (!order) {
      throw new BadRequestException('Error al crear la orden')
    }
    const tasks: CreateTaskDto[] = createOrderDto?.tasks?.map(task => ({
      description: task.description,
      equipments_id: task.equipments_id,
      users_id: task.users_id,
      orders_id: order.id
    }));
    await this.tasksRepository.save(tasks);

    return { message: 'Orden Creada Exitosamente', statusCode: 201, error: '' };
  }

  async findAll(meta: PaginationRequestMetaDto): Promise<PaginationDto<ResponseOrdersDto>> {
    const page = meta?.page || 1;
    const limit = meta?.limit || 10;
    const skit = (page - 1) * limit;

    const [result, total] = await this.ordersRepository.findAndCount({
      relations: {
        ordersType: true,
        branch: true
      },
      select: {
        id: true,
        order_number: true,
        status: true,
        created_at: true,
        orders_types_id: true,
        branches_id: true,
        ordersType: {
          name: true
        },
        branch: {
          name: true
        }
      },
      where: meta.search ? [
        {
          ordersType: {
            name: ILike(`%${meta.search}%`)
          }
        },
        {
          branch: {
            name: ILike(`%${meta.search}%`)
          }
        }
      ] : {},
      order: {
        [meta.orderBy || 'id']: meta.order || 'DESC'
      },
      skip: skit,
      take: limit
    });

    return {
      data: result,
      meta: {
        page: page,
        limit: limit,
        total: total,
        totalPages: Math.ceil(total / limit)
      }
    };
  }

  async findOne(id: number): Promise<ResponseOrdersDto | null> {
    return this.ordersRepository.findOne({
      relations: {
        ordersType: true,
        branch: true,
        tasks: {
          user: true,
          equipment: true
        }
      },
      select: {
        id: true,
        status: true,
        created_at: true,
        orders_types_id: true,
        branches_id: true,
        ordersType: {
          name: true
        },
        branch: {
          name: true,
          clients_id: true,
        },
        tasks: {
          id: true,
          description: true,
          end_date: true,
          start_date: true,
          equipments_id: true,
          users_id: true,
          status: true,
          user: {
            name: true,
            lastname: true,
          },
          equipment: {
            serial: true,
            brand: true,
            model: true,
            description: true
          }
        }
      },
      where: { id, tasks: { status: Not(0) } }
    });
  }

  async update(id: number, updateOrderDto: UpdateOrderDto): Promise<GenericResponsesDto> {
    const { tasks, ...orderData } = updateOrderDto;
    const updatedOrder = await this.ordersRepository.update(id, orderData);
    if (updatedOrder.affected === 0) throw new BadRequestException('Error al actualizar la Orden');
    const inactiveTasks = await this.tasksRepository.find({
      where: {
        orders_id: id,
        id: Not(In(tasks.map(t => t.id).filter(id => id !== undefined)))
      }
    });
    await Promise.all(inactiveTasks.map(task => this.tasksRepository.update(task.id, { status: 0 })));
    await Promise.all(tasks.map(async task => {
      if (task.id) {
        await this.tasksRepository.update(task.id, task);
      } else {
        await this.tasksRepository.save({ ...task, orders_id: id });
      }
    }));
    return { message: 'Orden Actualizada', statusCode: 200, error: '' };
  }

  async remove(id: number): Promise<GenericResponsesDto> {
    const removedOrder = await this.ordersRepository.update(id, { status: 0 });
    if (removedOrder.affected === 0) throw new BadRequestException('Error al eliminar la Orden');
    return { message: 'Orden Eliminada', statusCode: 200, error: '' };
  }
}
