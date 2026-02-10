import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger"
import { IsNotEmpty, IsOptional, IsString, Validate } from "class-validator"
import { QuestionsTypesAlreadyExistsConstraint } from "../../decorators/questions-types.validator"

export class CreateQuestionsTypeDto {
  @ApiProperty({
    description: 'Nombre',
    example: 'Texto'
  })
  @IsString({ message: 'Debe ser ingresado un texto' })
  @IsNotEmpty({ message: 'El nombre es obligatorio' })
  @Validate(QuestionsTypesAlreadyExistsConstraint)
  name: string

  @ApiPropertyOptional({
    description: 'Descripción',
    example: 'Pregunta de tipo texto abierto', required: false
  })
  @IsOptional()
  @IsString({ message: 'Debe ser ingresado un texto' })
  description?: string
}
