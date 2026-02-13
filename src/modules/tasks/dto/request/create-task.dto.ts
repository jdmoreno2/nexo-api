import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, IsOptional, IsString, Validate } from "class-validator";
import { EquipmentExistsConstraint } from "src/modules/equipments/decorators/equipments.validator";
import { OrderExistsConstraint } from "src/modules/orders/decorators/orders.validator";
import { UserExistsConstraint } from "src/modules/users/decorators/user.validator";

export class CreateTaskDto {
  @ApiPropertyOptional({
    description: 'Descripción',
    example: 'El equipo presento una averia', required: false
  })
  @IsOptional()
  @IsString({ message: 'Debe ser ingresado un texto' })
  description?: string

  @ApiPropertyOptional({
    description: 'Fecha de Inicio',
    example: '2026-01-05', required: false
  })
  @IsOptional()
  @IsString({ message: 'Debe ser ingresado un texto' })
  start_date?: string

  @ApiPropertyOptional({
    description: 'Fecha de Cierre',
    example: '2026-01-05', required: false
  })
  @IsOptional()
  @IsString({ message: 'Debe ser ingresado un texto' })
  end_date?: string

  @ApiProperty({
    description: 'ID de la orden de servicio',
    example: 1
  })
  @IsNotEmpty({ message: 'Faltan datos necesario: orders_id.' })
  @IsInt({ message: 'Formato de Datos invalido: orders_id debe ser un numero entero.' })
  @Validate(OrderExistsConstraint)
  orders_id: number;

  @ApiPropertyOptional({
    description: 'ID del equipo',
    example: 1
  })
  @IsOptional()
  @IsInt({ message: 'Formato de Datos invalido: users_id debe ser un numero entero.' })
  @Validate(EquipmentExistsConstraint)
  equipments_id: number;

  @ApiProperty({
    description: 'ID del usuario',
    example: 1
  })
  @IsNotEmpty({ message: 'Faltan datos necesario: users_id.' })
  @IsInt({ message: 'Formato de Datos invalido: users_id debe ser un numero entero.' })
  @Validate(UserExistsConstraint)
  users_id: number;
}
