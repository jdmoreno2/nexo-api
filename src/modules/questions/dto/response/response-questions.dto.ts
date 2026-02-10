import { ApiProperty } from "@nestjs/swagger"

export class ResponseQuestiosDto {
  @ApiProperty({ description: 'ID', example: 1 })
  id: number

  @ApiProperty({ description: 'Nombre', example: 'Ordene de servicio' })
  name: string

  @ApiProperty({ description: 'Descripción', example: 'Ordenes de servicio' })
  description?: string

  @ApiProperty({ description: 'Requerido', example: 1 })
  required: number

  @ApiProperty({ description: 'Estado', example: 1 })
  status: number

  @ApiProperty({
    description: 'ID del formulario',
    example: 1
  })
  forms_id: number;

  @ApiProperty({
    description: 'ID del tipo de pregunta',
    example: 1
  })
  questions_types_id: number;
}