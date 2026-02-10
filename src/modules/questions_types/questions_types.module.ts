import { Module } from '@nestjs/common';
import { QuestionsTypesService } from './questions_types.service';
import { QuestionsTypesController } from './questions_types.controller';
import { QuestionsType } from './entities/questions_type.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuestionsTypesAlreadyExistsConstraint, QuestionsTypesExistsConstraint, QuestionsTypesExistsPipe } from './decorators/questions-types.validator';

@Module({
  imports: [TypeOrmModule.forFeature([QuestionsType])],
  controllers: [QuestionsTypesController],
  providers: [
    QuestionsTypesService,
    QuestionsTypesAlreadyExistsConstraint,
    QuestionsTypesExistsConstraint,
    QuestionsTypesExistsPipe
  ],
  exports: [QuestionsTypesService, QuestionsTypesExistsConstraint]
})
export class QuestionsTypesModule { }
