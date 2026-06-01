import { SetMetadata } from '@nestjs/common';
import { Role } from './role.enum';

// instead of this everywhere @SetMetadata('roles', ['admin']) we use this below @Roles('admin')
export const Roles = (...roles: Role[]) => SetMetadata('roles', roles);
