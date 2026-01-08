import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";


export class CreatePermissionDto {

    @ApiProperty({ description: 'Nombre del permiso', example: 'READ_USERS' })
    @IsString({ message: 'Debe ser ingresado un texto' })
    @IsNotEmpty({ message: 'El nombre del permiso es obligatorio' })
    name: string

    @ApiPropertyOptional({ description: 'Descripción del permiso', example: 'Permiso para leer usuarios', required: false })
    @IsOptional()
    @IsString({ message: 'Debe ser ingresado un texto' })
    description?: string

}
