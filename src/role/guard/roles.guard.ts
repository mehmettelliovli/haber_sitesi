import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from './role.enum';
import { ROLES_KEY } from './roles.decorator';
import { JwtService } from '@nestjs/jwt';
//import { IResult } from './interface/result.interface';
import { CustomException } from 'src/exceptions/custom-exception';
import { ErrorCodes } from 'src/exceptions/error-codes';
import { ErrorMessages } from 'src/exceptions/error-messages';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private jwtService: JwtService,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const authorizationHeader = request.headers.authorization;

    if (!authorizationHeader) {
      console.log('Authorization header yok');
      return false;
    }

    const token = authorizationHeader.split(' ')[1];
    let decodedToken;

    try {
      decodedToken = this.jwtService.verify(token);
    } catch (err) {
      // throw new CustomException(
      //   ErrorCodes.USER_DOES_NOT_HAVE_THE_REQUIRED_ROLE,
      //   ErrorMessages.USER_DOES_NOT_HAVE_THE_REQUIRED_ROLE,
      //   403,
      // );
      //console.log('Token verification failed:', err);
      return false;
    }

    const userRoles = decodedToken.userRoles;

    const hasRole = requiredRoles.some((requiredRole) =>
      userRoles.some((userRole) => userRole.role === requiredRole),
    );
    if (!hasRole) {
      throw new CustomException(
        ErrorCodes.USER_DOES_NOT_HAVE_THE_REQUIRED_ROLE,
        ErrorMessages.USER_DOES_NOT_HAVE_THE_REQUIRED_ROLE,
        403,
      );
    }
    return hasRole;
  }
}
