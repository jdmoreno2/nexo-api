import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger"

export class ResponseUsersCloseTaskDto {
  @ApiProperty({ description: 'ID del usuario', example: 1 })
  id: number

  @ApiProperty({ description: 'Nombre del usuario', example: 'Juan' })
  name: string

  @ApiPropertyOptional({ description: 'Apellido del usuario', example: 'Pérez', nullable: true })
  lastname?: string

}
