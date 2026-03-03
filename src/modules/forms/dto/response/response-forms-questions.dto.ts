import { ApiProperty, OmitType, PickType } from "@nestjs/swagger"
import { Type } from "class-transformer"
import { ResponseQuestionsDto } from "src/modules/questions/dto/response/response-questions.dto"
import { ResponseResponsesDto } from "src/modules/responses/dto/response/response-responses.dto"
import { ResponseQuestionsTypesDto } from '../../../questions_types/dto/response/response-question-type.dto';

export class ResponseResponsesQuestionDto extends OmitType(ResponseResponsesDto, ['questions_id'] as const) { }

export class ResponseQuestionsTypesQuestionDto extends PickType(ResponseQuestionsTypesDto, ['name'] as const) { }

export class ResponseQuestionFormDto extends OmitType(ResponseQuestionsDto, ['forms_id'] as const) {
  @ApiProperty({
    description: 'Respuestas',
    type: [ResponseResponsesQuestionDto]
  })
  @Type(() => ResponseResponsesQuestionDto)
  responses: ResponseResponsesQuestionDto[]

  @ApiProperty({
    description: 'Tipo de Pregunta',
    type: ResponseQuestionsTypesQuestionDto
  })
  @Type(() => ResponseQuestionsTypesQuestionDto)
  questionsType: ResponseQuestionsTypesQuestionDto
}

export class ResponseFormWithQuestionsDto {
  @ApiProperty({ description: 'ID', example: 1 })
  id: number

  @ApiProperty({ description: 'Nombre', example: 'Mantenimiento' })
  name: string

  @ApiProperty({ description: 'Descripción', example: 'Formulario para mantenimientos' })
  description?: string

  @ApiProperty({ description: 'Estado', example: 1 })
  status: number

  @ApiProperty({
    description: 'ID del suscriptor',
    example: 1
  })
  subscribers_id: number;

  @ApiProperty({
    description: 'Preguntas',
    type: [ResponseQuestionFormDto]
  })
  @Type(() => ResponseQuestionFormDto)
  questions: ResponseQuestionFormDto[]


}