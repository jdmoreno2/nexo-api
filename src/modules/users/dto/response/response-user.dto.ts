import { ApiProperty } from "@nestjs/swagger"

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
}