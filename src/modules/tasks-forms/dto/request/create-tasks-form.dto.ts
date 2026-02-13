import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, IsOptional, IsString, Validate } from "class-validator";
import { FormExistsConstraint } from "src/modules/forms/decorators/forms.validator";
import { QuestionsExistsConstraint } from "src/modules/questions/decorators/questios.validator";
import { ResponsesExistsConstraint } from "src/modules/responses/decorators/responses.validator";
import { TasksExistsConstraint } from "src/modules/tasks/decorators/task.validator";

export class CreateTasksFormDto {
  @ApiPropertyOptional({
    description: 'Valor de la respuesta',
    example: 'Aqui respondi una pregunta', required: false
  })
  @IsOptional()
  @IsString({ message: 'Debe ser ingresado un texto' })
  value?: string

  @ApiProperty({
    description: 'ID de la tarea',
    example: 1
  })
  @IsNotEmpty({ message: 'Faltan datos necesario: tasks_id.' })
  @IsInt({ message: 'Formato de Datos invalido: tasks_id debe ser un numero entero.' })
  @Validate(TasksExistsConstraint)
  tasks_id: number;

  @ApiProperty({
    description: 'ID del formulario',
    example: 1
  })
  @IsNotEmpty({ message: 'Faltan datos necesario: forms_id.' })
  @IsInt({ message: 'Formato de Datos invalido: forms_id debe ser un numero entero.' })
  @Validate(FormExistsConstraint)
  forms_id: number;

  @ApiProperty({
    description: 'ID de la pregunta',
    example: 1
  })
  @IsNotEmpty({ message: 'Faltan datos necesario: questions_id.' })
  @IsInt({ message: 'Formato de Datos invalido: questions_id debe ser un numero entero.' })
  @Validate(QuestionsExistsConstraint)
  questions_id: number;

  @ApiPropertyOptional({
    description: 'ID de la respuesta',
    example: 1
  })
  @IsOptional()
  @IsInt({ message: 'Formato de Datos invalido: responses_id debe ser un numero entero.' })
  @Validate(ResponsesExistsConstraint)
  responses_id?: number;

}
