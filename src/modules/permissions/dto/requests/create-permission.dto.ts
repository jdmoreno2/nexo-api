import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString, Validate } from "class-validator";
import { PermissionAlreadyExistsConstraint } from "../../decorators/permission.validator";


export class CreatePermissionDto {

    @ApiProperty({ description: 'Nombre del permiso', example: 'READ_USERS' })
    @IsString({ message: 'Debe ser ingresado un texto' })
    @IsNotEmpty({ message: 'El nombre del permiso es obligatorio' })
    @Validate(PermissionAlreadyExistsConstraint)
    name: string

    @ApiPropertyOptional({ description: 'Descripción del permiso', example: 'Permiso para leer usuarios', required: false })
    @IsOptional()
    @IsString({ message: 'Debe ser ingresado un texto' })
    description?: string

}
