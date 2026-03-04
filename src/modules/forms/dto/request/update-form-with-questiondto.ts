import { ApiProperty, ApiPropertyOptional, OmitType, PartialType } from '@nestjs/swagger';
import { CreateFormDto } from './create-form.dto';
import { IsArray, IsNotEmpty, IsNumber, IsOptional, Max, Min, ValidateNested } from 'class-validator';
import { UpdateQuestionDto } from 'src/modules/questions/dto/request/update-question.dto';
import { Type } from 'class-transformer';

export class UpdateFormQuestionDto extends OmitType(UpdateQuestionDto, ['forms_id'] as const) { }


export class UpdateFormWithQuestionDto extends PartialType(CreateFormDto) {
  @ApiPropertyOptional({ description: 'ID', example: 1 })
  @IsNumber({}, { message: 'Debe ser un número entero' })
  id: number

  @ApiPropertyOptional({ description: 'Estado', example: 1, required: false })
  @IsOptional()
  @IsNumber({}, { message: 'Debe ser un número entero (0 o 1)' })
  @Min(0, { message: 'El dato enviado excede el rango permitido: mínimo 0' })
  @Max(1, { message: 'El dato enviado excede el rango permitido: máximo 1' })
  status?: number

  @ApiPropertyOptional({
    description: 'Preguntas',
    type: [UpdateFormQuestionDto]
  })
  @IsOptional()
  @IsNotEmpty({ message: 'Faltan datos necesario: questions.' })
  @IsArray({ message: 'questions debe ser un arreglo.' })
  @ValidateNested({ each: true })
  @Type(() => UpdateFormQuestionDto)
  questions?: UpdateFormQuestionDto[]
}
