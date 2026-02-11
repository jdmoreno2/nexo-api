import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateResponseDto } from './dto/request/create-response.dto';
import { UpdateResponseDto } from './dto/request/update-response.dto';
import { GenericResponsesDto } from 'src/common/dto/generic-response.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { Response } from './entities/response.entity';
import { PaginationDto, PaginationRequestMetaDto } from 'src/common/dto/pagination-response.dto';
import { ResponseResponsesDto } from './dto/response/response-responses.dto';

@Injectable()
export class ResponsesService {
  constructor(
    @InjectRepository(Response)
    private readonly responsesRepository: Repository<Response>
  ) { }

  async create(createResponseDto: CreateResponseDto): Promise<GenericResponsesDto> {
    if (!await this.responsesRepository.save(createResponseDto)) {
      throw new BadRequestException('Error al crear la Respuesta')
    }
    return { message: 'Respuesta Creada Exitosamente', statusCode: 201, error: '' };
  }

  async findAll(meta: PaginationRequestMetaDto): Promise<PaginationDto<ResponseResponsesDto>> {
    const page = meta?.page || 1;
    const limit = meta?.limit || 10;
    const skit = (page - 1) * limit;

    const [result, total] = await this.responsesRepository.findAndCount({
      select: {
        id: true,
        value: true,
        status: true,
      },
      where: meta.search ? [
        { value: ILike(`%${meta.search}%`) },
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

  async findByQuestionId(questionId: number): Promise<ResponseResponsesDto[]> {
    return this.responsesRepository.findBy({ questions_id: questionId });
  }

  async findOne(id: number): Promise<ResponseResponsesDto | null> {
    return this.responsesRepository.findOneBy({ id });
  }

  async update(id: number, updateResponseDto: UpdateResponseDto): Promise<GenericResponsesDto> {
    const updatedResponse = await this.responsesRepository.update(id, updateResponseDto);
    if (updatedResponse.affected === 0) throw new BadRequestException('Error al actualizar la Respuesta');
    return { message: 'Respuesta Actualizada', statusCode: 200, error: '' };
  }

  async remove(id: number): Promise<GenericResponsesDto> {
    const removedResponse = await this.responsesRepository.update(id, { status: 0 });
    if (removedResponse.affected === 0) throw new BadRequestException('Error al eliminar la Respuesta');
    return { message: 'Respuesta Eliminada', statusCode: 200, error: '' };
  }
}
