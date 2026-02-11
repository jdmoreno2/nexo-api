import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, IsString, Validate } from "class-validator";
import { QuestionsExistsConstraint } from "src/modules/questions/decorators/questios.validator";

export class CreateResponseDto {
  @ApiProperty({
    description: 'Valor',
    example: 'Respuesta a la pregunta',
  })
  @IsString({ message: 'Debe ser ingresado un texto' })
  @IsNotEmpty({ message: 'El valor es obligatorio' })
  value: string

  @ApiProperty({
    description: 'ID de la pregunta',
    example: 1
  })
  @IsNotEmpty({ message: 'Faltan datos necesario: questions_id.' })
  @IsInt({ message: 'Formato de Datos invalido: questions_id debe ser un numero entero.' })
  @Validate(QuestionsExistsConstraint)
  questions_id: number;

}
