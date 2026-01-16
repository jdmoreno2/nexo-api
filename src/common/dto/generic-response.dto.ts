import { ApiProperty } from "@nestjs/swagger";

export class GenericResponseDto {
  @ApiProperty({
    description: 'Mensaje de respuesta',
    example: 'Dato Creado'
  })
  message: string;

  @ApiProperty({
    description: 'Código de estado de la respuesta',
    example: 201
  })
  statusCode: number;


  @ApiProperty({
    description: 'Nombre del error',
    example: ''
  })
  error: string;
}
