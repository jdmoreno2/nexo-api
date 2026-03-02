import { Module, forwardRef } from '@nestjs/common';
import { ResponsesService } from './responses.service';
import { ResponsesController } from './responses.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Response } from './entities/response.entity';
import { QuestionsModule } from '../questions/questions.module';
import { ResponsesExistsConstraint, ResponsesExistsPipe } from './decorators/responses.validator';
import { QuestionsExistsPipe } from '../questions/decorators/questios.validator';

@Module({
  imports: [
    TypeOrmModule.forFeature([Response]),
    forwardRef(() => QuestionsModule)
  ],
  controllers: [ResponsesController],
  providers: [
    ResponsesService,
    ResponsesExistsConstraint,
    ResponsesExistsPipe,
    QuestionsExistsPipe
  ],
  exports: [ResponsesService, ResponsesExistsConstraint]
})
export class ResponsesModule { }
