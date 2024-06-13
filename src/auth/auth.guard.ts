import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Reflector } from '@nestjs/core';
import { AuthService } from './auth.service';
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private authService: AuthService,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const ctx = GqlExecutionContext.create(context);
    const request = ctx.getContext().req;
    const roles = this.reflector.get<string[]>('roles', ctx.getHandler());
    console.log(roles, 'Roles');

    const { body } = ctx.getContext();
    console.log('AuthGuard  ', body);
    const userId = this.authService.validateToken(
      request.headers.authorization.split(' ')[1],
    );
    request.user = { id: userId };
    return userId;
  }
}
