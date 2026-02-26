import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateEquipmentDto } from './dto/request/create-equipment.dto';
import { UpdateEquipmentDto } from './dto/request/update-equipment.dto';
import { PaginationDto, PaginationRequestMetaDto } from 'src/common/dto/pagination-response.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Equipment } from './entities/equipment.entity';
import { ILike, Repository } from 'typeorm';
import { ResponseEquipmentDto } from './dto/responses/responses-equipment.dto';
import { GenericResponsesDto } from 'src/common/dto/generic-response.dto';
import { EquipmentPaginationRequestMetaDto } from './dto/responses/equipment-pagination-request.dto';

@Injectable()
export class EquipmentsService {
  constructor(
    @InjectRepository(Equipment)
    private readonly equipmentsRepository: Repository<Equipment>
  ) { }

  async create(createEquipmentDto: CreateEquipmentDto): Promise<GenericResponsesDto> {
    if (!await this.equipmentsRepository.save(createEquipmentDto)) {
      throw new BadRequestException('Error al crear el Equipo')
    }
    return { message: 'Equipo Creado Exitosamente', statusCode: 201, error: '' };
  }

  async findAll(meta: EquipmentPaginationRequestMetaDto): Promise<PaginationDto<ResponseEquipmentDto>> {
    const page = meta?.page || 1;
    const limit = meta?.limit || 10;
    const skit = (page - 1) * limit;

    let where: any = {};

    if (meta.search) {
      where = [
        { serial: ILike(`%${meta.search}%`) },
        { description: ILike(`%${meta.search}%`) },
        { model: ILike(`%${meta.search}%`) },
        { brand: ILike(`%${meta.search}%`) },
        { branch: { name: ILike(`%${meta.search}%`) } },
      ]
    }

    if (meta.id) {
      where = { id: meta.id };
    }

    if (meta.serial) {
      where = { serial: ILike(`%${meta.serial}%`) };
    }

    if (meta.branchId) {
      where = { branch: { id: meta.branchId } };
    }

    if (meta.brand) {
      where = { brand: ILike(`%${meta.brand}%`) };
    }

    if (meta.model) {
      where = { model: ILike(`%${meta.model}%`) };
    }

    const [result, total] = await this.equipmentsRepository.findAndCount({
      relations: { branch: true },
      select: {
        id: true,
        description: true,
        serial: true,
        model: true,
        brand: true,
        status: true,
      },
      where,
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

  async findOne(id: number): Promise<ResponseEquipmentDto | null> {
    return this.equipmentsRepository.findOne({
      relations: { branch: true },
      select: {
        id: true,
        description: true,
        serial: true,
        brand: true,
        model: true,
        status: true,
        branches_id: true,
        branch: {
          name: true
        },
      },
      where: { id }
    });
  }


  async findOneBySerial(serial: string): Promise<ResponseEquipmentDto | null> {
    return this.equipmentsRepository.findOneBy({ serial });
  }

  async update(id: number, updateEquipmentDto: UpdateEquipmentDto): Promise<GenericResponsesDto> {
    const updatedEquipment = await this.equipmentsRepository.update(id, updateEquipmentDto);
    if (updatedEquipment.affected === 0) throw new BadRequestException('Error al actualizar el equipo');
    return { message: 'Equipo Actualizado', statusCode: 200, error: '' };
  }

  async remove(id: number): Promise<GenericResponsesDto> {
    const removedEquipment = await this.equipmentsRepository.update(id, { status: 0 });
    if (removedEquipment.affected === 0) throw new BadRequestException('Error al eliminar el Equipo');
    return { message: 'Equipo Eliminado', statusCode: 200, error: '' };
  }
}
