import { ApiProperty } from "@nestjs/swagger"

export class ResponseIdentificationTypeDto {
  @ApiProperty({ description: 'ID del tipo de identificacion', example: 1 })
  id: number

  @ApiProperty({ description: 'Nombre del tipo de identificacion', example: 'CC' })
  name: string

  @ApiProperty({ description: 'Descripción del tipo de identificacion', example: 'Numero de Cedula' })
  description: string

  @ApiProperty({ description: 'Estado del tipo de identificacion', example: 1 })
  status: number
}