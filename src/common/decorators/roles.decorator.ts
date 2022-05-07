import { SetMetadata } from '@nestjs/common';
import { Role } from 'src/users/entities/constants/role.enum';

export const Roles = (...roles: Role[]) => SetMetadata('roles', roles);
