import { ApiProperty } from "@nestjs/swagger"

export class ResponseFormsDto {
  @ApiProperty({ description: 'ID', example: 1 })
  id: number

  @ApiProperty({ description: 'Nombre', example: 'Mantenimiento' })
  name: string

  @ApiProperty({ description: 'Descripción', example: 'Formulario para mantenimientos' })
  description?: string

  @ApiProperty({ description: 'Estado', example: 1 })
  status: number

  @ApiProperty({
    description: 'ID del suscriptor',
    example: 1
  })
  subscribers_id: number;
}