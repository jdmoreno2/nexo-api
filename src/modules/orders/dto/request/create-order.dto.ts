import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, Validate } from "class-validator";
import { BranchExistsConstraint } from "src/modules/branches/decorators/branches.validator";
import { OrdersTypesExistsConstraint } from "src/modules/orders_types/decorators/orders-types.validator";

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
}
