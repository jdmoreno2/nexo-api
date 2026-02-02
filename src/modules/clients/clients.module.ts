import { Module } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { ClientsController } from './clients.controller';
import { SubscribersModule } from '../subscribers/subscribers.module';
import { SubscriberExistsConstraint } from '../subscribers/decorators/subscriber.validator';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Client } from './entities/client.entity';
import { ClientAlreadyExistsConstraint, ClientExistsConstraint, ClientExistsPipe } from './decorators/clients.validator';

@Module({
  imports: [
    SubscribersModule,
    TypeOrmModule.forFeature([Client]),
  ],
  controllers: [ClientsController],
  providers: [
    ClientsService,
    ClientAlreadyExistsConstraint,
    SubscriberExistsConstraint,
    ClientExistsPipe,
    ClientExistsConstraint
  ],
  exports: [ClientsService, ClientExistsConstraint]
})
export class ClientsModule { }
