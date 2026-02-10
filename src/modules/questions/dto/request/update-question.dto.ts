import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { CreateQuestionDto } from './create-question.dto';
import { IsNumber, IsOptional, Max, Min } from 'class-validator';

export class UpdateQuestionDto extends PartialType(CreateQuestionDto) {
  @ApiProperty({ description: 'ID', example: 1 })
  @IsNumber({}, { message: 'Debe ser un número entero' })
  id: number

  @ApiPropertyOptional({ description: 'Estado', example: 1, required: false })
  @IsOptional()
  @IsNumber({}, { message: 'Debe ser un número entero (0 o 1)' })
  @Min(0, { message: 'El dato enviado excede el rango permitido: mínimo 0' })
  @Max(1, { message: 'El dato enviado excede el rango permitido: máximo 1' })
  status?: number
}
