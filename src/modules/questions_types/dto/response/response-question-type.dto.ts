import { ApiProperty } from "@nestjs/swagger"

export class ResponseQuestionsTypesDto {
  @ApiProperty({ description: 'ID', example: 1 })
  id: number

  @ApiProperty({ description: 'Nombre', example: 'Mantenimiento' })
  name: string

  @ApiProperty({ description: 'Descripción', example: 'Formulario para mantenimientos' })
  description?: string

  @ApiProperty({ description: 'Estado', example: 1 })
  status: number
}