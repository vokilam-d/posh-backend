import { Injectable, CanActivate, ExecutionContext, mixin } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Role } from '../../user/enums/role.enum';
import { User } from '../../user/schemas/user.schema';
import { Public } from '../decorators/public.decorator';
import { Reflector } from '@nestjs/core';


export const RoleGuard = (role: Role) => {
  @Injectable()
  class RoleGuardMixin implements CanActivate {
    constructor(
      public readonly reflector: Reflector,
    ) {
    }

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
      const isPublic = this.reflector.get(Public, context.getClass());
      if (isPublic) {
        return true;
      }

      const request = context.switchToHttp().getRequest();
      const user: User = request.user;

      if (!user) {
        return false;
      }

      return user.role <= role;
    }
  }

  return mixin(RoleGuardMixin);
}
