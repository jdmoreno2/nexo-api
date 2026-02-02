import { ArgumentMetadata, Injectable, NotFoundException, PipeTransform } from '@nestjs/common';
import {
    ValidatorConstraint,
    ValidatorConstraintInterface,
    ValidationArguments,
} from 'class-validator';
import { UsersService } from '../users.service';
import e from 'express';

@ValidatorConstraint({ name: 'userAlreadyExist', async: true })
@Injectable()
export class UserAlreadyExistsConstraint implements ValidatorConstraintInterface {
    constructor(protected readonly usersService: UsersService) { }

    async validate(id: any, validationArguments: ValidationArguments) {

        const { isUpdate } = validationArguments.constraints[0]

        const userId = (validationArguments.object as any).identifier;

        const user = await this.usersService.findOneByIdentifier(id)

        if (!user) return true;
        if (isUpdate) return userId == user.identifier;
        return false;

    }

    defaultMessage(validationArguments: ValidationArguments): string {
        return `El usuario con id: ${validationArguments.value} ya está registrado.`;
    }

}

@ValidatorConstraint({ name: 'emailExists', async: true })
@Injectable()
export class emailExistsConstraint implements ValidatorConstraintInterface {
    constructor(protected readonly usersService: UsersService) { }

    async validate(email: string, validationArguments: ValidationArguments) {

        const { isUpdate } = validationArguments.constraints[0]

        const userId = (validationArguments.object as any).identifier;
        const emailFounded = await this.usersService.findOneByEmail(email)

        if (!emailFounded) return true;

        if (isUpdate) {
            return userId == emailFounded.identifier;
        }

        return false;
    }

    defaultMessage(validationArguments: ValidationArguments): string {
        return `El email: ${validationArguments.value} ya está registrado.`;
    }
}

@Injectable()
export class UserExistsPipe implements PipeTransform {
    constructor(private readonly usersService: UsersService) { }

    async transform(id: number) {
        const user = await this.usersService.findOne(id);
        if (!user) {
            throw new NotFoundException(`Usuario con id: ${id} no encontrado.`);
        }
        return id;
    }
}
