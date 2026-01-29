import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";




export class ResponseListRoleDto {
  @ApiProperty({
    description: 'ID del rol',
    example: 1
  })
  id: number

  @ApiProperty({
    description: 'Nombre del rol',
    example: 'Admin'
  })
  name: string;

  @ApiPropertyOptional({
    description: 'Descripción del rol',
    example: 'Rol con todos los permisos'
  })
  description?: string;

  @ApiProperty({
    description: 'ID del suscriptor al que pertenece el rol',
    example: 1
  })
  subscribers_id: number;

  @ApiProperty({
    description: 'Estado del rol',
    example: 1,
    required: false
  })
  status: number
}