import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { CreatePermissionDto } from './create-permission.dto';
import { IsNumber, IsOptional, Max, Min } from 'class-validator';

export class UpdatePermissionDto extends PartialType(CreatePermissionDto) {
    @ApiProperty({ description: 'ID del permiso', example: 1 })
    @IsNumber({}, { message: 'Debe ser un número entero' })
    id: number

    @ApiPropertyOptional({ description: 'Estado del permiso', example: 1, required: false })
    @IsOptional()
    @IsNumber({}, { message: 'Debe ser un número entero (0 o 1)' })
    @Min(0, { message: 'El dato enviado excede el rango permitido: mínimo 0' })
    @Max(1, { message: 'El dato enviado excede el rango permitido: máximo 1' })
    status?: number

}
