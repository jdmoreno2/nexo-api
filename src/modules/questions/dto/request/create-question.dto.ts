import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, IsOptional, IsString, Max, Min, Validate } from "class-validator";
import { FormExistsConstraint } from "src/modules/forms/decorators/forms.validator";
import { QuestionsTypesExistsConstraint } from "src/modules/questions_types/decorators/questions-types.validator";

export class CreateQuestionDto {
  @ApiProperty({
    description: 'Nombre',
    example: 'Orden de servicio'
  })
  @IsString({ message: 'Debe ser ingresado un texto' })
  @IsNotEmpty({ message: 'El nombre es obligatorio' })
  name: string

  @ApiPropertyOptional({
    description: 'Descripción',
    example: 'Para ordenes de Servicio', required: false
  })
  @IsOptional()
  @IsString({ message: 'Debe ser ingresado un texto' })
  description?: string

  @ApiProperty({
    description: 'Requerido (1: Si, 0: No)',
    example: 1
  })
  @IsNotEmpty({ message: 'Faltan datos necesario: required.' })
  @IsInt({ message: 'Formato de Datos invalido: required debe ser un numero entero.' })
  @Max(1, { message: 'El campo required solo puede ser 1 o 0.' })
  @Min(0, { message: 'El campo required solo puede ser 1 o 0.' })
  required: number = 0;

  @ApiProperty({
    description: 'ID del Formulario',
    example: 1
  })
  @IsNotEmpty({ message: 'Faltan datos necesario: forms_id.' })
  @IsInt({ message: 'Formato de Datos invalido: forms_id debe ser un numero entero.' })
  @Validate(FormExistsConstraint)
  forms_id: number;

  @ApiProperty({
    description: 'ID del tipo de pregunta',
    example: 1
  })
  @IsNotEmpty({ message: 'Faltan datos necesario: questios_types_id.' })
  @IsInt({ message: 'Formato de Datos invalido: questios_types_id debe ser un numero entero.' })
  @Validate(QuestionsTypesExistsConstraint)
  questios_types_id: number;
}
