import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateResponseDto {
  @ApiProperty({
    description: 'Valor',
    example: 'Respuesta a la pregunta',
  })
  @IsString({ message: 'Debe ser ingresado un texto' })
  @IsNotEmpty({ message: 'El valor es obligatorio' })
  value: string
}
