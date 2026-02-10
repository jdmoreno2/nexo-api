import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/request/create-order.dto';
import { UpdateOrderDto } from './dto/request/update-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { ILike, Repository } from 'typeorm';
import { GenericResponsesDto } from 'src/common/dto/generic-response.dto';
import { ResponseOrdersDto } from './dto/response/response-orders.dto';
import { PaginationDto, PaginationRequestMetaDto } from 'src/common/dto/pagination-response.dto';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly ordersRepository: Repository<Order>
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
    console.log({ orderNumber });
    if (!await this.ordersRepository.save({ ...createOrderDto, order_number: orderNumber })) {
      throw new BadRequestException('Error al crear la orden')
    }
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
        [meta.orderBy || 'id']: meta.order || 'ASC'
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
        branch: true
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
          name: true
        }
      },
      where: { id }
    });
  }

  async update(id: number, updateOrderDto: UpdateOrderDto): Promise<GenericResponsesDto> {
    const updatedOrder = await this.ordersRepository.update(id, updateOrderDto);
    if (updatedOrder.affected === 0) throw new BadRequestException('Error al actualizar la Orden');
    return { message: 'Orden Actualizada', statusCode: 200, error: '' };
  }

  async remove(id: number): Promise<GenericResponsesDto> {
    const removedOrder = await this.ordersRepository.update(id, { status: 0 });
    if (removedOrder.affected === 0) throw new BadRequestException('Error al eliminar la Orden');
    return { message: 'Orden Eliminada', statusCode: 200, error: '' };
  }
}
