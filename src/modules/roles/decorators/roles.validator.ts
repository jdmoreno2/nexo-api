import { Injectable, NotFoundException, PipeTransform } from '@nestjs/common';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { RolesService } from '../roles.service';

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

  async validate(id: number) {
    const role = await this.rolesService.findOne(id)
    return !!role;
  }

  defaultMessage(validationArguments: ValidationArguments): string {
    return `Rol con id: ${validationArguments.value} no encontrado.`;
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