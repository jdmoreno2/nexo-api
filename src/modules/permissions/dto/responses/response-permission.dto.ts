import { ApiProperty } from "@nestjs/swagger"

export class ResponsePermissionDto {
    @ApiProperty({ description: 'ID del permiso', example: 1 })
    id: number

    @ApiProperty({ description: 'Nombre del permiso', example: 'create_user' })
    name: string

    @ApiProperty({ description: 'Descripción del permiso', example: 'Permiso para crear usuarios' })
    description: string

    @ApiProperty({ description: 'Estado del permiso', example: 1 })
    status: number
}