import { Injectable } from '@nestjs/common';
import { CreateSuscriberDto } from './dto/request/create-suscriber.dto';
import { UpdateSuscriberDto } from './dto/request/update-suscriber.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Suscriber } from './entities/suscriber.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SuscribersService {
  constructor(
    @InjectRepository(Suscriber)
    private readonly suscribersRepository: Repository<Suscriber>
  ) { }

  create(createSuscriberDto: CreateSuscriberDto) {
    return 'This action adds a new suscriber';
  }

  findAll() {
    return `This action returns all suscribers`;
  }

  findOne(id: number) {
    return `This action returns a #${id} suscriber`;
  }

  update(id: number, updateSuscriberDto: UpdateSuscriberDto) {
    return `This action updates a #${id} suscriber`;
  }

  remove(id: number) {
    return `This action removes a #${id} suscriber`;
  }
}
