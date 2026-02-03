import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger"

export class ResponseUserDto {
  @ApiProperty({ description: 'ID del usuario', example: 1 })
  id: number

  @ApiProperty({ description: 'Nombre del usuario', example: 'Juan' })
  name: string

  @ApiProperty({ description: 'Apellido del usuario', example: 'Pérez', nullable: true })
  lastname?: string

  @ApiProperty({ description: 'Correo electrónico del usuario', example: 'email@email.com' })
  email: string

  @ApiProperty({ description: 'URL del avatar del usuario', example: 'http://example.com/avatar.jpg', nullable: true })
  avatar_url?: string

  @ApiProperty({ description: 'Estado del usuario', example: 1 })
  status: number

  @ApiProperty({ description: 'Fecha de creación del usuario', example: '2024-01-01T00:00:00.000Z' })
  created_at: Date

  @ApiProperty({ description: 'Fecha de última actualización del usuario', example: '2024-01-02T00:00:00.000Z', nullable: true })
  updated_at?: Date

  @ApiProperty({ description: 'ID del suscriptor asociado', example: 1, nullable: false })
  suscriber_id?: number

  @ApiProperty({
    description: 'Tipo de identificación del usuario',
    example: 'DNI'
  })
  identification_types_id: number;

  @ApiProperty({ description: 'Roles asignados al usuario', type: [Object], nullable: true })
  roles?: UserRolesDto[];

  @ApiProperty({
    description: 'IDs de los roles asociados al usuario',
    example: [1, 2, 3]
  })
  roles_ids: number[];

  @ApiProperty({ description: 'Tipo de Identificacion asignados al usuario', type: [Object], nullable: true })
  identificationType?: UserIdentificationTypeDto;

}

class UserRolesDto {
  @ApiProperty({ description: 'ID del rol', example: 1 })
  id: number

  @ApiProperty({ description: 'Nombre del rol', example: 'Admin' })
  name: string
}

class UserIdentificationTypeDto {
  @ApiProperty({ description: 'ID del tipo de identificacion', example: 1 })
  id: number

  @ApiProperty({ description: 'Nombre del tipo de identificacion', example: 'Admin' })
  name: string
}