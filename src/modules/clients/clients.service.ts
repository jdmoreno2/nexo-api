import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateClientDto } from './dto/request/create-client.dto';
import { UpdateClientDto } from './dto/request/update-client.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { Client } from './entities/client.entity';
import { PaginationDto, PaginationRequestMetaDto } from 'src/common/dto/pagination-response.dto';
import { ResponseClientDto } from './dto/response/response-client.dto';
import { GenericResponsesDto } from 'src/common/dto/generic-response.dto';

@Injectable()
export class ClientsService {
  constructor(
    @InjectRepository(Client)
    private readonly clientsRepository: Repository<Client>
  ) { }

  async create(createClientDto: CreateClientDto): Promise<GenericResponsesDto> {
    if (!await this.clientsRepository.save(createClientDto)) {
      throw new BadRequestException('Error al crear el cliente')
    }
    return { message: 'Cliente Creado Exitosamente', statusCode: 201, error: '' };
  }

  async findAll(meta: PaginationRequestMetaDto): Promise<PaginationDto<ResponseClientDto>> {
    const page = meta?.page || 1;
    const limit = meta?.limit || 10;
    const skit = (page - 1) * limit;

    const [result, total] = await this.clientsRepository.findAndCount({
      where: meta.search ? {
        name: `LIKE '%${meta.search}%'`,
        nit: `LIKE '%${meta.search}%'`,
        phone: `LIKE '%${meta.search}%'`,
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

  findOne(id: number): Promise<ResponseClientDto | null> {
    return this.clientsRepository.findOneBy({ id });
  }

  findOneByNit(nit: string): Promise<ResponseClientDto | null> {
    return this.clientsRepository.findOneBy({ nit: ILike(nit.toLocaleUpperCase()) });
  }

  async update(id: number, updateClientDto: UpdateClientDto): Promise<GenericResponsesDto> {
    const updatedSubscriber = await this.clientsRepository.update(id, updateClientDto);
    if (updatedSubscriber.affected === 0) throw new BadRequestException('Error al actualizar el Cliente');
    return { message: 'Cliente Actualizado', statusCode: 200, error: '' };
  }

  async remove(id: number): Promise<GenericResponsesDto> {
    const removedClient = await this.clientsRepository.update(id, { status: 0 });
    if (removedClient.affected === 0) throw new BadRequestException('Error al eliminar el Cliente');
    return { message: 'Cliente Eliminado', statusCode: 200, error: '' };
  }
}
