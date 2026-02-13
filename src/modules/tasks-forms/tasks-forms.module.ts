import { Module } from '@nestjs/common';
import { TasksFormsService } from './tasks-forms.service';
import { TasksFormsController } from './tasks-forms.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksForm } from './entities/tasks-form.entity';
import { TasksModule } from '../tasks/tasks.module';
import { FormsModule } from '../forms/forms.module';
import { QuestionsModule } from '../questions/questions.module';
import { ResponsesModule } from '../responses/responses.module';
import { TasksExistsConstraint, TasksExistsPipe } from '../tasks/decorators/task.validator';
import { FormExistsConstraint } from '../forms/decorators/forms.validator';
import { ResponsesExistsConstraint } from '../responses/decorators/responses.validator';
import { QuestionsExistsConstraint } from '../questions/decorators/questios.validator';

@Module({
  imports: [
    TypeOrmModule.forFeature([TasksForm]),
    TasksModule,
    FormsModule,
    QuestionsModule,
    ResponsesModule
  ],
  controllers: [TasksFormsController],
  providers: [
    TasksFormsService,
    TasksExistsConstraint,
    FormExistsConstraint,
    QuestionsExistsConstraint,
    ResponsesExistsConstraint,
    TasksExistsPipe
  ],
  exports: [TasksFormsService]
})
export class TasksFormsModule { }
