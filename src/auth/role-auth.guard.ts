import { CanActivate, ExecutionContext, mixin, Type } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Role } from '../user/schemas/user.schema';
import { JwtAuthGuard } from './jwt-auth.guard';

export const RoleGuard = (roles: Role[]): Type<CanActivate> => {
  class RoleGuardMixin implements CanActivate {
    canActivate(context: ExecutionContext) {
      const request = context.switchToHttp().getRequest();
      const user = request.user;
      return roles.includes(user.role);
    }
  }
  return mixin(RoleGuardMixin);
};
