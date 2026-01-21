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

@ValidatorConstraint({ name: 'permissionExists', async: true })
@Injectable()
export class PermissionExistsConstraint implements ValidatorConstraintInterface {
  constructor(protected readonly permissionsService: PermissionsService) { }

  async validate(value: number | number[], args: ValidationArguments) {
    const idsToCheck = Array.isArray(value) ? value : [value];
    if (!idsToCheck || idsToCheck.length === 0) return true;

    const permissions = await this.permissionsService.findByIds(idsToCheck)
    const foundIds = permissions.map(p => p.id);

    const missingIds = idsToCheck.filter(id => !foundIds.includes(id));
    if (missingIds.length > 0) {
      const errorKey = `_missingIds_${args.property}`;
      (args.object as any)[errorKey] = missingIds;
      return false
    };

    return true;
  }

  defaultMessage(validationArguments: ValidationArguments): string {
    const errorKey = `_missingIds_${validationArguments.property}`;
    const missingIds = (validationArguments.object as any)[errorKey];
    const count = missingIds?.length || 0;
    const text = count === 1 ? 'Permiso con id' : 'Permisos con ids';
    return `${text}: ${missingIds?.join(', ')} no encontrado(s).`;
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

