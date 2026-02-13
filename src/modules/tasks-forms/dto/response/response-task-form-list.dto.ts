import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

class QuestionDto {
  @ApiProperty({ description: 'ID del formulario', example: 1 })
  id: number

  @ApiProperty({ description: 'Nombre del formulario', example: 'Juan' })
  name: string
}

class ResponseDto {
  @ApiProperty({ description: 'ID del formulario', example: 1 })
  id: number

  @ApiProperty({ description: 'Nombre del formulario', example: 'Juan' })
  value: string
}

export class ResponseFormsTasksListDto {
  @ApiProperty({ description: 'ID', example: 1 })
  tasks_id: number;

  @ApiProperty({ description: 'Valor', example: 'Averia en el equipo' })
  value?: string;

  @ApiPropertyOptional({ description: 'Pregunta', type: [Object], nullable: true })
  question?: QuestionDto;

  @ApiPropertyOptional({ description: 'Respuesta', type: [Object], nullable: true })
  response?: ResponseDto;
}