import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateFormDto } from './dto/request/create-form.dto';
import { UpdateFormDto } from './dto/request/update-form.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Form } from './entities/form.entity';
import { ILike, Repository } from 'typeorm';
import { GenericResponsesDto } from 'src/common/dto/generic-response.dto';
import { PaginationDto, PaginationRequestMetaDto } from 'src/common/dto/pagination-response.dto';
import { ResponseFormsDto } from './dto/response/response-forms.dto';

@Injectable()
export class FormsService {
  constructor(
    @InjectRepository(Form)
    private readonly formsRepository: Repository<Form>
  ) { }

  async create(createFormDto: CreateFormDto): Promise<GenericResponsesDto> {
    if (!await this.formsRepository.save(createFormDto)) {
      throw new BadRequestException('Error al crear el formulario')
    }
    return { message: 'Formulario Creado Exitosamente', statusCode: 201, error: '' };
  }

  async findAll(meta: PaginationRequestMetaDto): Promise<PaginationDto<ResponseFormsDto>> {
    const page = meta?.page || 1;
    const limit = meta?.limit || 10;
    const skit = (page - 1) * limit;

    const [result, total] = await this.formsRepository.findAndCount({
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

  async findOne(id: number): Promise<Form | null> {
    return this.formsRepository.findOneBy({ id });
  }

  async findOneByName(name: string): Promise<Form | null> {
    return this.formsRepository.findOneBy({ name: ILike(name.toLowerCase()) });
  }

  async update(id: number, updateFormDto: UpdateFormDto): Promise<GenericResponsesDto> {
    const updatedForm = await this.formsRepository.update(id, updateFormDto);
    if (updatedForm.affected === 0) throw new BadRequestException('Error al actualizar el Formulario');
    return { message: 'Formulario Actualizado', statusCode: 200, error: '' };
  }

  async remove(id: number): Promise<GenericResponsesDto> {
    const removedBranch = await this.formsRepository.update(id, { status: 0 });
    if (removedBranch.affected === 0) throw new BadRequestException('Error al eliminar el Formulario');
    return { message: 'Formulario Eliminado', statusCode: 200, error: '' };
  }
}
