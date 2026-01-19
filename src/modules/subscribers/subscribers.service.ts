import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateSubscriberDto } from './dto/request/create-subscriber.dto';
import { UpdateSubscriberDto } from './dto/request/update-subscriber.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Subscriber as Subscriber } from './entities/subscriber.entity';
import { Repository } from 'typeorm';
import { GenericResponsesDto } from 'src/common/dto/generic-response.dto';
import { PaginationDto, PaginationRequestMetaDto } from 'src/common/dto/pagination-response.dto';
import { ResponseSubscriberDto } from './dto/responses/response-subscriber.dto';

@Injectable()
export class SubscribersService {
  constructor(
    @InjectRepository(Subscriber)
    private readonly subscribersRepository: Repository<Subscriber>
  ) { }

  async create(createSubscriberDto: CreateSubscriberDto): Promise<GenericResponsesDto> {
    if (!await this.subscribersRepository.save(createSubscriberDto)) {
      throw new BadRequestException('Error al crear el Suscriptor')
    }
    return { message: 'Suscriptor Creado', statusCode: 201, error: '' };
  }

  async findAll(meta: PaginationRequestMetaDto): Promise<PaginationDto<ResponseSubscriberDto>> {
    const page = meta?.page || 1;
    const limit = meta?.limit || 10;
    const skit = (page - 1) * limit;

    const [result, total] = await this.subscribersRepository.findAndCount({
      where: meta.search ? {
        company_name: `LIKE '%${meta.search}%'`,
        nit: `LIKE '%${meta.search}%'`,
        email: `LIKE '%${meta.search}%'`,
        address: `LIKE '%${meta.search}%'`,
      } : {},
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

  findOne(id: number): Promise<ResponseSubscriberDto | null> {
    return this.subscribersRepository.findOneBy({ id });
  }


  async findOneByNit(nit: string): Promise<ResponseSubscriberDto | null> {
    return await this.subscribersRepository.findOneBy({ nit });
  }

  async update(id: number, updateSubscriberDto: UpdateSubscriberDto): Promise<GenericResponsesDto> {
    const updatedSubscriber = await this.subscribersRepository.update(id, updateSubscriberDto);
    if (updatedSubscriber.affected === 0) throw new BadRequestException('Error al actualizar el Suscriptor');
    return { message: 'Suscriptor Actualizado', statusCode: 200, error: '' };
  }

  async remove(id: number): Promise<GenericResponsesDto> {
    const removedSubscriber = await this.subscribersRepository.update(id, { status: 0 });
    if (removedSubscriber.affected === 0) throw new BadRequestException('Error al eliminar el Suscriptor');
    return { message: 'Suscriptor Eliminado', statusCode: 200, error: '' };
  }
}
