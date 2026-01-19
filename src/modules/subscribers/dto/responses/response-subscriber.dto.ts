import { PartialType } from "@nestjs/swagger";
import { UpdateSubscriberDto } from "../request/update-subscriber.dto";

export class ResponseSubscriberDto extends PartialType(UpdateSubscriberDto) {

}