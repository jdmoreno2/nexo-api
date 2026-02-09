import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateOrdersTypeDto } from './dto/request/create-orders_type.dto';
import { UpdateOrdersTypeDto } from './dto/request/update-orders_type.dto';
import { GenericResponsesDto } from 'src/common/dto/generic-response.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { OrdersType } from './entities/orders_type.entity';
import { ILike, Repository } from 'typeorm';
import { PaginationDto, PaginationRequestMetaDto } from 'src/common/dto/pagination-response.dto';
import { ResponseOrdersTypesDto } from './dto/response/response-orders-types.dto';

@Injectable()
export class OrdersTypesService {
  constructor(
    @InjectRepository(OrdersType)
    private readonly ordersTypesRepository: Repository<OrdersType>
  ) { }

  async create(createOrdersTypeDto: CreateOrdersTypeDto): Promise<GenericResponsesDto> {
    if (!await this.ordersTypesRepository.save(createOrdersTypeDto)) {
      throw new BadRequestException('Error al crear el tipo de orden')
    }
    return { message: 'Tipo de orden Creada Exitosamente', statusCode: 201, error: '' };
  }

  async findAll(meta: PaginationRequestMetaDto): Promise<PaginationDto<ResponseOrdersTypesDto>> {
    const page = meta?.page || 1;
    const limit = meta?.limit || 10;
    const skit = (page - 1) * limit;

    const [result, total] = await this.ordersTypesRepository.findAndCount({
      select: {
        id: true,
        name: true,
        description: true,
        status: true,
        subscribers_id: true
      },
      where: meta.search ? [
        { name: ILike(`%${meta.search}%`) },
        { description: ILike(`%${meta.search}%`) },
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

  async findOne(id: number) {
    return this.ordersTypesRepository.findOneBy({ id });
  }

  async findOneByName(name: string) {
    return this.ordersTypesRepository.findOneBy({ name: ILike(name.toLowerCase()) });
  }

  async update(id: number, updateOrdersTypeDto: UpdateOrdersTypeDto): Promise<GenericResponsesDto> {
    const updatedBranch = await this.ordersTypesRepository.update(id, updateOrdersTypeDto);
    if (updatedBranch.affected === 0) throw new BadRequestException('Error al actualizar el Tipo de orden');
    return { message: 'Tipo de orden Actualizado', statusCode: 200, error: '' };
  }

  async remove(id: number): Promise<GenericResponsesDto> {
    const removedBranch = await this.ordersTypesRepository.update(id, { status: 0 });
    if (removedBranch.affected === 0) throw new BadRequestException('Error al eliminar el Tipo de orden');
    return { message: 'Tipo de orden Eliminado', statusCode: 200, error: '' };
  }
}
