import { ApiProperty, ApiPropertyOptional, OmitType } from "@nestjs/swagger";
import { IsArray, IsInt, IsNotEmpty, IsOptional, IsString, Max, Min, Validate, ValidateNested } from "class-validator";
import { FormAlreadyExistsConstraint } from "../../decorators/forms.validator";
import { SubscriberExistsConstraint } from "src/modules/subscribers/decorators/subscriber.validator";
import { Type } from "class-transformer";
import { CreateQuestionDto } from "src/modules/questions/dto/request/create-question.dto";
import { OrdersTypesExistsConstraint } from "src/modules/orders_types/decorators/orders-types.validator";

export class CreateFormQuestionDto extends OmitType(CreateQuestionDto, ['forms_id'] as const) {

}

export class CreateFormWithQuestionDto {
  @ApiProperty({
    description: 'Nombre',
    example: 'Mantenimiento'
  })
  @IsString({ message: 'Debe ser ingresado un texto' })
  @IsNotEmpty({ message: 'El nombre es obligatorio' })
  @Validate(FormAlreadyExistsConstraint)
  name: string

  @ApiPropertyOptional({
    description: 'Descripción',
    example: 'Para ordenes de Servicio de mantenimiento', required: false
  })
  @IsOptional()
  @IsString({ message: 'Debe ser ingresado un texto' })
  description?: string

  @ApiProperty({
    description: 'ID del suscriptor',
    example: 1
  })
  @IsNotEmpty({ message: 'Faltan datos necesario: subscribers_id.' })
  @IsInt({ message: 'Formato de Datos invalido: subscribers_id debe ser un numero entero.' })
  @Validate(SubscriberExistsConstraint)
  subscribers_id: number;

  @ApiProperty({
    description: 'ID del tipo de orden',
    example: 1
  })
  @IsNotEmpty({ message: 'Faltan datos necesario: orders_types_id.' })
  @IsInt({ message: 'Formato de Datos invalido: orders_types_id debe ser un numero entero.' })
  @Validate(OrdersTypesExistsConstraint)
  orders_types_id: number;

  @ApiProperty({
    description: 'Preguntas',
    type: [CreateFormQuestionDto]
  })
  @IsNotEmpty({ message: 'Faltan datos necesario: questions.' })
  @IsArray({ message: 'questions debe ser un arreglo.' }) // Recomendado para asegurar el tipo
  @ValidateNested({ each: true }) // <--- Valida cada elemento del arreglo
  @Type(() => CreateFormQuestionDto)
  questions: CreateFormQuestionDto[]
}
