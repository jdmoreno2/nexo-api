import { ArgumentMetadata, Injectable, NotFoundException, PipeTransform } from '@nestjs/common';
import {
    ValidatorConstraint,
    ValidatorConstraintInterface,
    ValidationArguments,
} from 'class-validator';
import { PermissionsService } from '../permissions.service';

@ValidatorConstraint({ name: 'permissionAlreadyExist', async: true })
@Injectable()
export class PermissionAlreadyExistsConstraint implements ValidatorConstraintInterface {
    constructor(protected readonly permissionsService: PermissionsService) { }

    async validate(name: string, args: ValidationArguments) {

        const permisionId = (args.object as any).id;

        const permission = await this.permissionsService.findOneByName(name);

        if (!permission) return true;
        if (permission) return permisionId === permission.id;
        return false;

    }

    defaultMessage(args: ValidationArguments) {
        return `El permiso ${args.value} ya está registrado.`;
    }
}
@Injectable()
export class PermissionExistsPipe implements PipeTransform {
    constructor(private readonly permissionService: PermissionsService) { }

    async transform(id: number) {
        const permmission = await this.permissionService.findOne(id);
        if (!permmission) {
            throw new NotFoundException(`Permiso con id: ${id} no encontrado.`);
        }
        return id;
    }
}

