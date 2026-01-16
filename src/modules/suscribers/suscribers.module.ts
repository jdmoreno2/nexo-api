import { Module } from '@nestjs/common';
import { SuscribersService } from './suscribers.service';
import { SuscribersController } from './suscribers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Suscriber } from './entities/suscriber.entity';
import { suscriberAlreadyExistsConstraint, SuscriberExistsPipe } from './decorators/suscriber.validator';

@Module({
  imports: [
    TypeOrmModule.forFeature([Suscriber])
  ],
  controllers: [SuscribersController],
  providers: [
    SuscribersService,
    suscriberAlreadyExistsConstraint,
    SuscriberExistsPipe
  ],
})
export class SuscribersModule { }
