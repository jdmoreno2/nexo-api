import { ApiProperty, ApiPropertyOptional, OmitType, PartialType } from '@nestjs/swagger';
import { CreateQuestionDto } from './create-question.dto';
import { IsArray, IsNotEmpty, IsNumber, IsOptional, Max, Min, ValidateNested } from 'class-validator';
import { UpdateResponseDto } from 'src/modules/responses/dto/request/update-response.dto';
import { Type } from 'class-transformer';

export class UpdateQuestionsResponseDto extends OmitType(UpdateResponseDto, ['questions_id'] as const) { }

export class UpdateQuestionDto extends PartialType(OmitType(CreateQuestionDto, ['responses'] as const)) {
  @ApiPropertyOptional({ description: 'ID', example: 1 })
  @IsOptional()
  @IsNumber({}, { message: 'Debe ser un número entero' })
  id?: number

  @ApiPropertyOptional({ description: 'Estado', example: 1, required: false })
  @IsOptional()
  @IsNumber({}, { message: 'Debe ser un número entero (0 o 1)' })
  @Min(0, { message: 'El dato enviado excede el rango permitido: mínimo 0' })
  @Max(1, { message: 'El dato enviado excede el rango permitido: máximo 1' })
  status?: number

  @ApiPropertyOptional({
    description: 'Respuestas',
    type: [UpdateQuestionsResponseDto]
  })
  @IsOptional()
  @IsNotEmpty({ message: 'Faltan datos necesario: responses.' })
  @IsArray({ message: 'responses debe ser un arreglo.' })
  @ValidateNested({ each: true })
  @Type(() => UpdateQuestionsResponseDto)
  responses?: UpdateQuestionsResponseDto[]
}
