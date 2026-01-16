import { ArgumentMetadata, Injectable, NotFoundException, PipeTransform } from '@nestjs/common';
import {
    ValidatorConstraint,
    ValidatorConstraintInterface,
    ValidationArguments,
} from 'class-validator';
import { UsersService } from '../users.service';

@ValidatorConstraint({ name: 'userAlreadyExist', async: true })
@Injectable()
export class UserAlreadyExistsConstraint implements ValidatorConstraintInterface {
    constructor(protected readonly usersService: UsersService) { }

    async validate(id: any, validationArguments: ValidationArguments) {

        const userId = (validationArguments.object as any).id;

        const user = await this.usersService.findOne(id)

        if (!user) return true;
        if (user) return userId === user.id;
        return false;

    }

    defaultMessage(validationArguments: ValidationArguments): string {
        return `El usuario con id: ${validationArguments.value} no está registrado.`;
    }

}
