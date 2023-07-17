import { JwtService } from '@nestjs/jwt';
import { Request, Response, NextFunction } from 'express';
import { Injectable, NestMiddleware } from '@nestjs/common';

import { CustomException } from '@Exceptions/custom.exception';
import { CustomExceptionMessages } from '@Exceptions/custom.exception.message';
import { EnvironmentVariablesService } from '@Envs/environments-variables.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  private readonly jwtService = new JwtService();

  constructor(
    private readonly environmentVariableService: EnvironmentVariablesService,
  ) {}

  use(req: Request, res: Response, next: NextFunction) {
    const token = this.getAndVerifyTokenFromHeaders(req);

    const isAuthenticate = this.jwtService.verify(token, {
      secret: this.environmentVariableService.getJwtSecret,
    });
    if (!isAuthenticate)
      throw new CustomException(CustomExceptionMessages.E_UNAUTHORIZED);

    next();
  }

  getAndVerifyTokenFromHeaders(req: Request): string {
    const [type, token] = req.headers.authorization?.split(' ') ?? [];
    if (!type || !token)
      throw new CustomException(
        CustomExceptionMessages.E_INVALID_AUTHORIZATION_HEADER,
      );
    if (type !== 'Bearer')
      throw new CustomException(
        CustomExceptionMessages.E_INVALID_AUTHORIZATION_HEADER,
      );

    const correct = token.split('.');
    if (correct.length !== 3)
      throw new CustomException(
        CustomExceptionMessages.E_INVALID_AUTHORIZATION_HEADER,
      );

    return token;
  }
}
