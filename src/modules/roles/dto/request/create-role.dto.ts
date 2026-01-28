import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, IsOptional, IsString, Validate } from "class-validator";
import { PermissionExistsConstraint } from "src/modules/permissions/decorators/permission.validator";
import { subscriberAlreadyExistsConstraint } from "src/modules/subscribers/decorators/subscriber.validator";
import { RolesAlreadyExistsConstraint } from "../../decorators/roles.validator";

export class CreateRoleDto {

  @ApiProperty({
    description: 'Nombre del rol',
    example: 'Admin'
  })
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

  @ApiProperty({
    description: 'ID del suscriptor al que pertenece el rol',
    example: 1
  })
  @IsNotEmpty({ message: 'Faltan datos necesario: subscribers_id.' })
  @IsInt({ message: 'Formato de Datos invalido: subscribers_id debe ser un numero entero.' })
  @Validate(subscriberAlreadyExistsConstraint)
  subscribers_id: number;

  @ApiProperty({
    description: 'IDs de los permisos asociados al rol',
    example: [1, 2, 3]
  })
  @IsNotEmpty({ message: 'Faltan datos necesario: permissions_ids.' })
  @IsInt({ each: true, message: 'Formato de Datos invalido: permissions_ids debe ser un arreglo de numeros enteros.' })
  @Validate(PermissionExistsConstraint)
  permissions_ids: number[];

}
