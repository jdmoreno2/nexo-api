import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateQuestionsTypeDto } from './dto/request/create-questions_type.dto';
import { UpdateQuestionsTypeDto } from './dto/request/update-questions_type.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { QuestionsType } from './entities/questions_type.entity';
import { ILike, Repository } from 'typeorm';
import { GenericResponsesDto } from 'src/common/dto/generic-response.dto';
import { PaginationDto, PaginationRequestMetaDto } from 'src/common/dto/pagination-response.dto';
import { ResponseQuestionsTypesDto } from './dto/response/response-question-type.dto';

@Injectable()
export class QuestionsTypesService {
  constructor(
    @InjectRepository(QuestionsType)
    private readonly questionsTypesRepository: Repository<QuestionsType>
  ) { }

  async create(createQuestionsTypeDto: CreateQuestionsTypeDto): Promise<GenericResponsesDto> {
    if (!await this.questionsTypesRepository.save(createQuestionsTypeDto)) {
      throw new BadRequestException('Error al crear el tipo de pregunta')
    }
    return { message: 'Tipo de Pregunta Creado Exitosamente', statusCode: 201, error: '' };
  }

  async findAll(meta: PaginationRequestMetaDto): Promise<PaginationDto<ResponseQuestionsTypesDto>> {
    const page = meta?.page || 1;
    const limit = meta?.limit || 10;
    const skit = (page - 1) * limit;

    const [result, total] = await this.questionsTypesRepository.findAndCount({
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

  async findOne(id: number): Promise<QuestionsType | null> {
    return this.questionsTypesRepository.findOneBy({ id });
  }

  async findOneByName(name: string): Promise<QuestionsType | null> {
    return this.questionsTypesRepository.findOneBy({ name: ILike(name.toLowerCase()) });
  }

  async update(id: number, updateQuestionsTypeDto: UpdateQuestionsTypeDto): Promise<GenericResponsesDto> {
    const updatedForm = await this.questionsTypesRepository.update(id, updateQuestionsTypeDto);
    if (updatedForm.affected === 0) throw new BadRequestException('Error al actualizar el Tipo de Pregunta');
    return { message: 'Tipo de Pregunta Actualizado', statusCode: 200, error: '' };
  }

  async remove(id: number): Promise<GenericResponsesDto> {
    const removedBranch = await this.questionsTypesRepository.update(id, { status: 0 });
    if (removedBranch.affected === 0) throw new BadRequestException('Error al eliminar el tipo de pregunta');
    return { message: 'Tipo de Pregunta Eliminado', statusCode: 200, error: '' };
  }
}
