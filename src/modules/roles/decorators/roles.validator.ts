import { Injectable, NotFoundException, PipeTransform } from '@nestjs/common';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { RolesService } from '../roles.service';

// WeakMap para almacenar IDs faltantes sin contaminar el objeto DTO
const missingIdsStorage = new WeakMap<object, Map<string, number[]>>();

@ValidatorConstraint({ name: 'rolesAlreadyExists', async: true })
@Injectable()
export class RolesAlreadyExistsConstraint implements ValidatorConstraintInterface {
  constructor(protected readonly rolesService: RolesService) { }

  async validate(name: string, args: ValidationArguments) {
    const obj = args.object as any;
    const roleId = obj.id;
    const role = await this.rolesService.findOneByName(name);
    if (!role) return true;
    if (roleId) return role.id == roleId;
    return false;
  }

  defaultMessage(args: ValidationArguments) {
    return `El nombre ${args.value} ya está registrado.`;
  }
}

@ValidatorConstraint({ name: 'roleExists', async: true })
@Injectable()
export class RoleExistsConstraint implements ValidatorConstraintInterface {
  constructor(protected readonly rolesService: RolesService) { }

  async validate(value: number | number[], args: ValidationArguments) {
    const idsToCheck = Array.isArray(value) ? value : [value];
    if (!idsToCheck?.length) return true;

    const roles = await this.rolesService.findByIds(idsToCheck);
    const foundIdsSet = new Set(roles.map(p => p.id));
    const missingIds = idsToCheck.filter(id => !foundIdsSet.has(id));

    // Guardar en WeakMap en lugar de en el objeto
    if (missingIds.length > 0) {
      if (!missingIdsStorage.has(args.object)) {
        missingIdsStorage.set(args.object, new Map());
      }
      missingIdsStorage.get(args.object)!.set(args.property, missingIds);
    }

    return missingIds.length === 0;

  }

  defaultMessage(validationArguments: ValidationArguments): string {
    const propertyMap = missingIdsStorage.get(validationArguments.object);
    const missingIds = propertyMap?.get(validationArguments.property) || [];
    const count = missingIds.length;
    const text = count === 1 ? 'Role con id' : 'Roles con ids';
    return `${text}: ${missingIds.join(', ')} no encontrado(s).`;
  }
}

@Injectable()
export class RoleExistsPipe implements PipeTransform {
  constructor(private readonly rolesService: RolesService) { }

  async transform(id: number) {
    const role = await this.rolesService.findOne(id);
    if (!role) {
      throw new NotFoundException(`Rol con id: ${id} no encontrado.`);
    }
    return id;
  }
}