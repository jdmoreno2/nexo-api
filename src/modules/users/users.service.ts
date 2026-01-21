import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/request/create-user.dto';
import { UpdateUserDto } from './dto/request/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { PaginationDto, PaginationRequestMetaDto } from 'src/common/dto/pagination-response.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) { }

  async create(createUserDto: CreateUserDto, file: string) {

    if (file) {
      createUserDto.avatar = file;
    }

    const password_hash = bcrypt.hashSync(createUserDto.password, 10);

    createUserDto['password_hash'] = password_hash;

    const newUser = await this.userRepository.save(createUserDto)

    if (newUser) return { message: 'Usuario creado exitosamente', statusCode: 201, error: '' };
    throw new BadRequestException('Error al crear al usuario')

  }

  async findAll(meta: PaginationRequestMetaDto): Promise<PaginationDto<User>> {

    const page = meta?.page || 1;
    const limit = meta?.limit || 10;

    const [users, total] = await this.userRepository.findAndCount({
      order: { [meta.orderBy as string]: meta.order },
      skip: (page - 1) * limit,
      take: limit,
    });

    return {
      data: users,
      meta: {
        page: page,
        limit: limit,
        total,
        totalPages: Math.ceil(total / limit),
      }
    }
  }

  findOneByIdentifier(identifier: number) {
    return this.userRepository.findOneBy({ identifier });
  }

  findOneByEmail(email: string) {
    return this.userRepository.findOneBy({ email });
  }

  findOne(id: number) {
    return this.userRepository.findOneBy({ id });
  }

  async update(id: string, updateUserDto: UpdateUserDto, file: string) {


    if (file) {
      updateUserDto.avatar = file;

      delete updateUserDto.avatar;
    } else {
      delete updateUserDto.avatar;
    }

    if (updateUserDto.password) {
      const password_hash = bcrypt.hashSync(updateUserDto.password, 10);

      updateUserDto['password_hash'] = password_hash;

      delete updateUserDto.password;
    } else {
      delete updateUserDto.password;
    }

    const updatedUser = await this.userRepository.update(id, updateUserDto)

    if (updatedUser.affected === 0) throw new BadRequestException('Error al actualizar el usuario')

    return { message: 'Usuario actualizado exitosamente', statusCode: 200, error: '' };

  }

  async remove(id: number): Promise<GenericResponsesDto> {
    const updateUser = await this.userRepository.update(id, ({ status: 0 }));

    if (updateUser.affected === 0) throw new BadRequestException('Error al eliminar el usuario')

    return { message: 'Usuario eliminado exitosamente', statusCode: 200, error: '' };

  }
}
