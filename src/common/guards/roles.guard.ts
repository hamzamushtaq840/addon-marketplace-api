import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { Role } from './role.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();
    const roles = this.reflector.get<Role[]>('roles', context.getHandler());

    if (!roles) return true;

    const isAdminAccess = roles.includes(Role.ADMIN);

    if (isAdminAccess) {
      const adminToken = request.headers['x-admin-token'];

      if (adminToken !== 'secure-admin-token-123') {
        return false;
      }
    }

    return true;
  }
}
