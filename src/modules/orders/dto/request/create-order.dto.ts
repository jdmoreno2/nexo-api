import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsArray, IsInt, IsNotEmpty, IsOptional, Validate, ValidateNested } from "class-validator";
import { BranchExistsConstraint } from "src/modules/branches/decorators/branches.validator";
import { EquipmentExistsConstraint } from "src/modules/equipments/decorators/equipments.validator";
import { OrdersTypesExistsConstraint } from "src/modules/orders_types/decorators/orders-types.validator";
import { UserExistsConstraint } from "src/modules/users/decorators/user.validator";

export class CreateOrderTaskItemDto {
  @ApiPropertyOptional({
    description: 'Descripción de la tarea.',
    example: 'Reparacion del equipo.',
  })
  @IsOptional()
  description?: string;

  @ApiPropertyOptional({
    description: 'ID del equipo.',
    example: 1,
  })
  @IsOptional()
  @IsInt({ message: 'Formato de Datos invalido: equipment_id debe ser un numero entero.' })
  @Validate(EquipmentExistsConstraint)
  equipments_id?: number;

  @ApiProperty({
    description: 'ID del usuario asignado a la tarea.',
    example: 1,
  })
  @IsNotEmpty({ message: 'Faltan datos necesario: users_id.' })
  @IsInt({ message: 'Formato de Datos invalido: users_id debe ser un numero entero.' })
  @Validate(UserExistsConstraint)
  users_id: number;
}

export class CreateOrderDto {
  @ApiProperty({
    description: 'ID de la sucursal.',
    example: 1
  })
  @IsNotEmpty({ message: 'Faltan datos necesario: branches_id.' })
  @IsInt({ message: 'Formato de Datos invalido: branches_id debe ser un numero entero.' })
  @Validate(BranchExistsConstraint)
  branches_id: number;

  @ApiProperty({
    description: 'ID del tipo de orden.',
    example: 1
  })
  @IsNotEmpty({ message: 'Faltan datos necesario: orders_types_id.' })
  @IsInt({ message: 'Formato de Datos invalido: orders_types_id debe ser un numero entero.' })
  @Validate(OrdersTypesExistsConstraint)
  orders_types_id: number;

  @ApiProperty({
    description: 'Lista de tareas asociadas a la orden.',
    type: [CreateOrderTaskItemDto]
  })
  @IsNotEmpty({ message: 'Faltan datos necesario: tasks.' })
  @IsArray({ message: 'tasks debe ser un arreglo.' }) // Recomendado para asegurar el tipo
  @ValidateNested({ each: true }) // <--- Valida cada elemento del arreglo
  @Type(() => CreateOrderTaskItemDto)
  tasks: CreateOrderTaskItemDto[];
}


