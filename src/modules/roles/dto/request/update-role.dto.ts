import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { CreateRoleDto } from './create-role.dto';
import { IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, Max, Min, Validate } from 'class-validator';
import { RolesAlreadyExistsConstraint } from '../../decorators/roles.validator';
import { PermissionExistsConstraint } from 'src/modules/permissions/decorators/permission.validator';

export class UpdateRoleDto extends PartialType(CreateRoleDto) {
  @ApiProperty({ description: 'ID del rol', example: 1 })
  @IsNumber({}, { message: 'Formato de Datos invalido: id debe ser un número entero' })
  id: number

  @ApiPropertyOptional({
    description: 'Nombre del rol',
    example: 'Admin'
  })
  @IsOptional()
  @IsString({ message: 'Formato de Datos invalido: name debe ser una cadena de texto.' })
  @IsNotEmpty({ message: 'Faltan datos necesario: name.' })
  @Validate(RolesAlreadyExistsConstraint)
  name: string;

  @ApiPropertyOptional({
    description: 'Descripción del rol',
    example: 'Rol con todos los permisos'
  })
  @IsOptional()
  @IsString({ message: 'Formato de Datos invalido: description debe ser una cadena de texto.' })
  description?: string;

  @ApiPropertyOptional({
    description: 'IDs de los permisos asociados al rol',
    example: [1, 2, 3]
  })
  @IsOptional()
  @IsNotEmpty({ message: 'Faltan datos necesario: permissions_ids.' })
  @IsInt({ each: true, message: 'Formato de Datos invalido: permissions_ids debe ser un arreglo de numeros enteros.' })
  @Validate(PermissionExistsConstraint)
  permissions_ids: number[];

  @ApiPropertyOptional({ description: 'Estado del rol', example: 1, required: false })
  @IsOptional()
  @IsNumber({}, { message: 'Debe ser un número entero (0 o 1)' })
  @Min(0, { message: 'El dato enviado excede el rango permitido: mínimo 0' })
  @Max(1, { message: 'El dato enviado excede el rango permitido: máximo 1' })
  status?: number
}
