import { BadRequestException, forwardRef, Inject, Injectable } from '@nestjs/common';
import { CreateQuestionDto } from './dto/request/create-question.dto';
import { UpdateQuestionDto } from './dto/request/update-question.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { Question } from './entities/question.entity';
import { GenericResponsesDto } from 'src/common/dto/generic-response.dto';
import { PaginationDto, PaginationRequestMetaDto } from 'src/common/dto/pagination-response.dto';
import { ResponseQuestionsTypesDto } from '../questions_types/dto/response/response-question-type.dto';
import { ResponsesService } from '../responses/responses.service';
import { Response } from '../responses/entities/response.entity';

@Injectable()
export class QuestionsService {
  constructor(
    @InjectRepository(Question)
    private readonly questionsRepository: Repository<Question>,
    @Inject(forwardRef(() => ResponsesService))
    private responsesService: ResponsesService,
  ) { }

  async create(createQuestionDto: CreateQuestionDto): Promise<GenericResponsesDto> {
    const { responses, ...rest } = createQuestionDto;
    const savedQuestion = await this.questionsRepository.save({ ...rest })
    if (!savedQuestion) {
      throw new BadRequestException('Error al crear la Pregunta')
    }
    if (responses) {
      const errors: string[] = [];
      for (const response of responses) {
        try {
          await this.responsesService.create({ value: response, questions_id: savedQuestion.id })
        } catch (error) {
          errors.push(`Error al registrar la respuesta: ${response}.`)
          console.log(`Error al registrar la respuesta: ${response}.`);
        }
      }
      if (errors.length) throw new BadRequestException('Error al crear la Pregunta');
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
    const { responses, ...rest } = updateQuestionDto;
    const updatedQuestion = await this.questionsRepository.update(id, rest);
    if (updatedQuestion.affected === 0) throw new BadRequestException('Error al actualizar la Pregunta');
    const oldQuestion = await this.questionsRepository.findOne({ where: { id, responses: { status: 1 } }, relations: { responses: true } });
    let deletedResponses: Response[] = [];
    let newResponses: string[] = [];
    if (oldQuestion?.responses && responses) {
      deletedResponses = oldQuestion.responses.filter(r => !responses.includes(r.value));
      newResponses = responses.filter(p => !oldQuestion.responses.map(r1 => r1.value).includes(p))
    }
    const errors: string[] = [];
    if (newResponses.length) {
      for (const response of newResponses) {
        try {
          await this.responsesService.create({
            questions_id: id,
            value: response,
          })
        } catch (error) {
          errors.push(`Error al registrar/actualizar la respuesta: ${response}.`)
          console.log(`Error al registrar/actualizar la respuesta: ${response}.`);
        }
      }
    }
    if (deletedResponses.length) {
      for (const response of deletedResponses) {
        try {
          await this.responsesService.remove(response.id)
        } catch (error) {
          errors.push(`Error al eliminar la respuesta: ${response}.`)
          console.log(`Error al eliminar la respuesta: ${response}.`);
        }
      }
    }
    if (errors.length) throw new BadRequestException('Error al crear la Pregunta');
    return { message: 'Pregunta Actualizada', statusCode: 200, error: '' };
  }

  async remove(id: number): Promise<GenericResponsesDto> {
    const removedQuestion = await this.questionsRepository.update(id, { status: 0 });
    if (removedQuestion.affected === 0) throw new BadRequestException('Error al eliminar la pregunta');
    return { message: 'Pregunta Eliminada', statusCode: 200, error: '' };
  }
}
