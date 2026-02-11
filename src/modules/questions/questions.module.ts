import { Module } from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { QuestionsController } from './questions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Question } from './entities/question.entity';
import { FormsModule } from '../forms/forms.module';
import { QuestionsTypesModule } from '../questions_types/questions_types.module';
import { QuestionsExistsConstraint, QuestionsExistsPipe } from './decorators/questios.validator';
import { FormExistsConstraint } from '../forms/decorators/forms.validator';
import { QuestionsTypesExistsConstraint } from '../questions_types/decorators/questions-types.validator';

@Module({
  imports: [
    TypeOrmModule.forFeature([Question]),
    FormsModule,
    QuestionsTypesModule
  ],
  controllers: [QuestionsController],
  providers: [
    QuestionsService,
    QuestionsExistsConstraint,
    QuestionsExistsPipe,
    FormExistsConstraint,
    QuestionsTypesExistsConstraint
  ],
  exports: [
    QuestionsService,
    QuestionsExistsConstraint,
    QuestionsExistsPipe
  ]
})
export class QuestionsModule { }
