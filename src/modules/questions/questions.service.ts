import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateQuestionDto } from './dto/request/create-question.dto';
import { UpdateQuestionDto } from './dto/request/update-question.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { Question } from './entities/question.entity';
import { GenericResponsesDto } from 'src/common/dto/generic-response.dto';
import { PaginationDto, PaginationRequestMetaDto } from 'src/common/dto/pagination-response.dto';
import { ResponseQuestionsTypesDto } from '../questions_types/dto/response/response-question-type.dto';

@Injectable()
export class QuestionsService {
  constructor(
    @InjectRepository(Question)
    private readonly questionsRepository: Repository<Question>
  ) { }

  async create(createQuestionDto: CreateQuestionDto): Promise<GenericResponsesDto> {
    if (!await this.questionsRepository.save(createQuestionDto)) {
      throw new BadRequestException('Error al crear la Pregunta')
    }
    return { message: 'Pregunta Creado Exitosamente', statusCode: 201, error: '' };
  }

  async findAll(meta: PaginationRequestMetaDto): Promise<PaginationDto<ResponseQuestionsTypesDto>> {
    const page = meta?.page || 1;
    const limit = meta?.limit || 10;
    const skit = (page - 1) * limit;

    const [result, total] = await this.questionsRepository.findAndCount({
      select: {
        id: true,
        name: true,
        description: true,
        required: true,
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

  async findOne(id: number): Promise<ResponseQuestionsTypesDto | null> {
    return this.questionsRepository.findOneBy({ id });
  }

  async update(id: number, updateQuestionDto: UpdateQuestionDto): Promise<GenericResponsesDto> {
    const updatedQuestion = await this.questionsRepository.update(id, updateQuestionDto);
    if (updatedQuestion.affected === 0) throw new BadRequestException('Error al actualizar la Pregunta');
    return { message: 'Pregunta Actualizada', statusCode: 200, error: '' };
  }

  async remove(id: number): Promise<GenericResponsesDto> {
    const removedQuestion = await this.questionsRepository.update(id, { status: 0 });
    if (removedQuestion.affected === 0) throw new BadRequestException('Error al eliminar la pregunta');
    return { message: 'Pregunta Eliminada', statusCode: 200, error: '' };
  }
}
