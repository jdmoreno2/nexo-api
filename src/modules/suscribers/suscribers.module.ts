import { Module } from '@nestjs/common';
import { SuscribersService } from './suscribers.service';
import { SuscribersController } from './suscribers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Suscriber } from './entities/suscriber.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Suscriber])
  ],
  controllers: [SuscribersController],
  providers: [SuscribersService],
})
export class SuscribersModule { }
