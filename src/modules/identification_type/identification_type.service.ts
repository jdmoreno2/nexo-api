import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateIdentificationTypeDto } from './dto/request/create-identification_type.dto';
import { UpdateIdentificationTypeDto } from './dto/request/update-identification_type.dto';
import { PaginationDto, PaginationRequestMetaDto } from 'src/common/dto/pagination-response.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { IdentificationType } from './entities/identification_type.entity';
import { ILike, Repository } from 'typeorm';
import { GenericResponsesDto } from 'src/common/dto/generic-response.dto';
import { ResponseIdentificationTypeDto } from './dto/response/response-identification-type.dto';

@Injectable()
export class IdentificationTypeService {
  constructor(
    @InjectRepository(IdentificationType)
    private readonly identificationTypeRepository: Repository<IdentificationType>
  ) { }

  async create(createIdentificationTypeDto: CreateIdentificationTypeDto): Promise<GenericResponsesDto> {
    if (!await this.identificationTypeRepository.save(createIdentificationTypeDto)) {
      throw new BadRequestException('Error al crear el tipo de identificacion')
    }
    return { message: 'Tipo de identificacion Creada Exitosamente', statusCode: 201, error: '' };
  }

  async findAll(meta: PaginationRequestMetaDto): Promise<PaginationDto<ResponseIdentificationTypeDto>> {
    const page = meta?.page || 1;
    const limit = meta?.limit || 10;
    const skit = (page - 1) * limit;

    const [result, total] = await this.identificationTypeRepository.findAndCount({
      select: {
        id: true,
        name: true,
        description: true,
        status: true,
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

  async findOne(id: number): Promise<ResponseIdentificationTypeDto | null> {
    return this.identificationTypeRepository.findOneBy({ id });
  }


  async findOneByName(name: string): Promise<ResponseIdentificationTypeDto | null> {
    return this.identificationTypeRepository.findOneBy({ name });
  }

  async update(id: number, updateIdentificationTypeDto: UpdateIdentificationTypeDto): Promise<GenericResponsesDto> {
    const updatedBranch = await this.identificationTypeRepository.update(id, updateIdentificationTypeDto);
    if (updatedBranch.affected === 0) throw new BadRequestException('Error al actualizar el Tipo de identificacion');
    return { message: 'Tipo de identificacion Actualizado', statusCode: 200, error: '' };
  }

  async remove(id: number): Promise<GenericResponsesDto> {
    const removedBranch = await this.identificationTypeRepository.update(id, { status: 0 });
    if (removedBranch.affected === 0) throw new BadRequestException('Error al eliminar el Tipo de identificacion');
    return { message: 'Tipo de identificacion Eliminado', statusCode: 200, error: '' };
  }
}
