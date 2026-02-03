import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateBranchDto } from './dto/request/create-branch.dto';
import { UpdateBranchDto } from './dto/request/update-branch.dto';
import { PaginationDto, PaginationRequestMetaDto } from 'src/common/dto/pagination-response.dto';
import { GenericResponsesDto } from 'src/common/dto/generic-response.dto';
import { ResponseClientDto } from '../clients/dto/response/response-client.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Branch } from './entities/branch.entity';
import { ILike, Repository } from 'typeorm';

@Injectable()
export class BranchesService {
  constructor(
    @InjectRepository(Branch)
    private readonly branchesRepository: Repository<Branch>
  ) {
  }
  async create(createBranchDto: CreateBranchDto): Promise<GenericResponsesDto> {
    if (!await this.branchesRepository.save(createBranchDto)) {
      throw new BadRequestException('Error al crear la sucursal')
    }
    return { message: 'Sucursal Creada Exitosamente', statusCode: 201, error: '' };
  }

  async findAll(meta: PaginationRequestMetaDto): Promise<PaginationDto<ResponseClientDto>> {
    const page = meta?.page || 1;
    const limit = meta?.limit || 10;
    const skit = (page - 1) * limit;

    const [result, total] = await this.branchesRepository.findAndCount({
      relations: { client: true },
      select: {
        id: true,
        name: true,
        address: true,
        phone: true,
        clients_id: true,
        client: {
          name: true
        },
        status: true,
      },
      where: meta.search ? [
        { name: ILike(`%${meta.search}%`) },
        { phone: ILike(`%${meta.search}%`) },
        { address: ILike(`%${meta.search}%`) },
        { client: { name: ILike(`%${meta.search}%`) } },
        { client: { nit: ILike(`%${meta.search}%`) } }
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

  async findOne(id: number): Promise<ResponseClientDto | null> {
    return this.branchesRepository.findOne({
      relations: { client: true },
      select: {
        id: true,
        name: true,
        address: true,
        phone: true,
        clients_id: true,
        client: {
          name: true
        },
        status: true,
      },
      where: { id }
    });
  }

  async findOneByName(name: string): Promise<Branch | null> {
    return this.branchesRepository.findOneBy({ name: ILike(name.toLocaleLowerCase()) });
  }

  async update(id: number, updateBranchDto: UpdateBranchDto): Promise<GenericResponsesDto> {
    const updatedBranch = await this.branchesRepository.update(id, updateBranchDto);
    if (updatedBranch.affected === 0) throw new BadRequestException('Error al actualizar la Sucursal');
    return { message: 'Sucursal Actualizado', statusCode: 200, error: '' };
  }

  async remove(id: number): Promise<GenericResponsesDto> {
    const removedBranch = await this.branchesRepository.update(id, { status: 0 });
    if (removedBranch.affected === 0) throw new BadRequestException('Error al eliminar la Sucursal');
    return { message: 'Sucursal Eliminada', statusCode: 200, error: '' };
  }
}
