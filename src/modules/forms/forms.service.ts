import { BadRequestException, forwardRef, Inject, Injectable } from '@nestjs/common';
import { CreateFormDto } from './dto/request/create-form.dto';
import { UpdateFormDto } from './dto/request/update-form.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Form } from './entities/form.entity';
import { ILike, Repository } from 'typeorm';
import { GenericResponsesDto } from 'src/common/dto/generic-response.dto';
import { PaginationDto, PaginationRequestMetaDto } from 'src/common/dto/pagination-response.dto';
import { ResponseFormsDto } from './dto/response/response-forms.dto';
import { CreateFormWithQuestionDto } from './dto/request/create-form-with-question.dto';
import { QuestionsService } from '../questions/questions.service';
import { UpdateFormWithQuestionDto } from './dto/request/update-form-with-questiondto';
import { Question } from '../questions/entities/question.entity';

@Injectable()
export class FormsService {
  constructor(
    @InjectRepository(Form)
    private readonly formsRepository: Repository<Form>,
    @Inject(forwardRef(() => QuestionsService))
    private questionsService: QuestionsService,
  ) { }

  async create(createFormDto: CreateFormDto): Promise<GenericResponsesDto> {
    if (!await this.formsRepository.save(createFormDto)) {
      throw new BadRequestException('Error al crear el formulario')
    }
    return { message: 'Formulario Creado Exitosamente', statusCode: 201, error: '' };
  }

  async createFormWithQuestions(createFormWithQuestionDto: CreateFormWithQuestionDto): Promise<GenericResponsesDto> {
    const { questions, ...rest } = createFormWithQuestionDto;
    const savedForm = await this.formsRepository.save(rest)
    if (!savedForm) {
      throw new BadRequestException('Error al crear el formulario')
    }
    const errors: string[] = [];
    for (const question of questions) {
      try {
        await this.questionsService.create({ ...question, forms_id: savedForm.id });
      } catch (error) {
        errors.push(`Error al registrar la pregunta: ${question.name}.`)
        console.log(`Error al registrar la pregunta: ${question.name}.`);
      }
    }
    if (errors.length) throw new BadRequestException('Error al crear el formulario');
    return { message: 'Formulario Creado Exitosamente', statusCode: 201, error: '' };
  }

  async findAll(meta: PaginationRequestMetaDto): Promise<PaginationDto<ResponseFormsDto>> {
    const page = meta?.page || 1;
    const limit = meta?.limit || 10;
    const skit = (page - 1) * limit;

    const [result, total] = await this.formsRepository.findAndCount({
      relations: {
        ordersType: true
      },
      select: {
        id: true,
        name: true,
        description: true,
        status: true,
        subscribers_id: true,
        ordersType: {
          name: true
        }
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

  async findOne(id: number): Promise<Form | null> {
    return this.formsRepository.findOneBy({ id });
  }

  async findOneWithQuestions(id: number): Promise<Form | null> {
    return this.formsRepository.createQueryBuilder("form")
      .leftJoinAndSelect(
        "form.questions",
        "question",
        "question.status = :qStatus",
        { qStatus: 1 }
      )
      .leftJoinAndSelect(
        "question.responses",
        "response",
        "response.status = :rStatus",
        { rStatus: 1 }
      )
      .leftJoinAndSelect("question.questionType", "questionType")
      .select([
        "form.id", "form.name", "form.description", "form.status", "form.subscribers_id", "form.orders_types_id",
        "question.id", "question.name", "question.description", "question.status",
        "question.questions_types_id", "questionType.name",
        "response.id", "response.value", "response.status"
      ])
      .where("form.id = :id", { id })
      .getOne();
  }

  async findOneByName(name: string): Promise<Form | null> {
    return this.formsRepository.findOneBy({ name: ILike(name.toLowerCase()) });
  }

  async update(id: number, updateFormDto: UpdateFormDto): Promise<GenericResponsesDto> {
    const updatedForm = await this.formsRepository.update(id, updateFormDto);
    if (updatedForm.affected === 0) throw new BadRequestException('Error al actualizar el Formulario');
    return { message: 'Formulario Actualizado', statusCode: 200, error: '' };
  }

  async updateFormWithQuestions(id: number, updateFormDto: UpdateFormWithQuestionDto): Promise<GenericResponsesDto> {
    const { questions: updatedQuestions, ...rest } = updateFormDto;
    const updatedForm = await this.formsRepository.update(id, rest);
    if (updatedForm.affected === 0) throw new BadRequestException('Error al actualizar el Formulario');
    const oldForm = await this.formsRepository.findOne({ where: { id }, relations: { questions: true } });
    let deletedQuestions: Question[] = [];
    if (oldForm && updatedQuestions) {
      deletedQuestions = oldForm.questions.filter(q => !updatedQuestions.map(q1 => q1.id).includes(q.id));
    }
    const errors: string[] = [];
    if (updatedQuestions) {
      for (const question of updatedQuestions) {
        try {
          if (question.id) {
            await this.questionsService.update(question.id, { ...question, forms_id: id });
          } else {
            const { responses, ...restQuestion } = question;
            if (responses) {
              await this.questionsService.create({
                description: restQuestion.description,
                questions_types_id: restQuestion.questions_types_id!,
                required: restQuestion.required!,
                name: restQuestion.name!,
                responses: responses,
                forms_id: id
              })
            }
          }
        } catch (error) {
          errors.push(`Error al registrar/actualizar la pregunta: ${question.name}.`)
          console.log(`Error al registrar/actualizar la pregunta: ${question.name}.`);
        }
      }
      if (deletedQuestions.length) {
        for (const question of deletedQuestions) {
          try {
            await this.questionsService.remove(question.id);
          } catch (error) {
            errors.push(`Error al eliminar la pregunta: ${question.name}.`)
            console.log(`Error al eliminar la pregunta: ${question.name}.`);
          }
        }
      }
    }
    if (errors.length) throw new BadRequestException('Error al Actualizar el formulario');
    return { message: 'Formulario Actualizado', statusCode: 200, error: '' };
  }


  async remove(id: number): Promise<GenericResponsesDto> {
    const removedBranch = await this.formsRepository.update(id, { status: 0 });
    if (removedBranch.affected === 0) throw new BadRequestException('Error al eliminar el Formulario');
    return { message: 'Formulario Eliminado', statusCode: 200, error: '' };
  }
}
