import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateSuscriberDto } from './dto/request/create-suscriber.dto';
import { UpdateSuscriberDto } from './dto/request/update-suscriber.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Suscriber } from './entities/suscriber.entity';
import { Repository } from 'typeorm';
import { GenericResponseDto } from 'src/common/dto/generic-response.dto';
import { PaginationDto, PaginationRequestMetaDto } from 'src/common/dto/pagination-response.dto';
import { ResponseSuscriberDto } from './dto/responses/response-suscriber.dto';
import { parse } from 'path';

@Injectable()
export class SuscribersService {
  constructor(
    @InjectRepository(Suscriber)
    private readonly suscribersRepository: Repository<Suscriber>
  ) { }

  async create(createSuscriberDto: CreateSuscriberDto): Promise<GenericResponseDto> {
    if (!await this.suscribersRepository.save(createSuscriberDto)) {
      throw new BadRequestException('Error al crear el Suscriptor')
    }
    return { message: 'Suscriptor Creado', statusCode: 201, error: '' };
  }

  async findAll(meta: PaginationRequestMetaDto): Promise<PaginationDto<ResponseSuscriberDto>> {
    const page = meta?.page || 1;
    const limit = meta?.limit || 10;
    const skit = (page - 1) * limit;

    const [result, total] = await this.suscribersRepository.findAndCount({
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

  findOne(id: number): Promise<ResponseSuscriberDto | null> {
    return this.suscribersRepository.findOneBy({ id });
  }


  async findOneByNit(nit: string): Promise<ResponseSuscriberDto | null> {
    return await this.suscribersRepository.findOneBy({ nit });
  }

  async update(id: number, updateSuscriberDto: UpdateSuscriberDto): Promise<GenericResponseDto> {
    const updatedSuscriber = await this.suscribersRepository.update(id, updateSuscriberDto);
    if (updatedSuscriber.affected === 0) throw new BadRequestException('Error al actualizar el Suscriptor');
    return { message: 'Suscriptor Actualizado', statusCode: 200, error: '' };
  }

  async remove(id: number): Promise<GenericResponseDto> {
    const removedSuscriber = await this.suscribersRepository.update(id, { status: 0 });
    if (removedSuscriber.affected === 0) throw new BadRequestException('Error al eliminar el Suscriptor');
    return { message: 'Suscriptor Eliminado', statusCode: 200, error: '' };
  }
}
