import { ApiProperty } from "@nestjs/swagger"

export class ResponseResponsesDto {
  @ApiProperty({ description: 'ID', example: 1 })
  id: number

  @ApiProperty({ description: 'valor', example: 'Respuestas' })
  value: string

  @ApiProperty({ description: 'Estado', example: 1 })
  status: number

  @ApiProperty({
    description: 'ID de la pregunta',
    example: 1
  })
  questions_id: number;
}