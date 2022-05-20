import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GqlExecutionContext } from '@nestjs/graphql';

import * as jwt from 'express-jwt';
import { expressJwtSecret } from 'jwks-rsa';
import { promisify } from 'node:util';

//! Guard é basicamente um middleware
//* Vai determinar se o usuário pode seguir com a requisição ou não.

//? promisify -> Converte função que usa padrão async de callbacks, para Promises.

// SOLID -> I -> Inversão de dependências

//! O nest vai fazer automaticamente a injeção de dependências.
@Injectable()
export class AuthorizationGuard implements CanActivate {
  private AUTH0_AUDIENCE: string;
  private AUTH0_DOMAIN: string;

  //! Quando nosso servidor rodar, quero que coloque dentro da variavel, a dependência que vem do Nest Config
  constructor(private configService: ConfigService) {
    this.AUTH0_AUDIENCE = this.configService.get('AUTH0_AUDIENCE') ?? '';
    this.AUTH0_DOMAIN = this.configService.get('AUTH0_DOMAIN') ?? '';
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    //! Versão REST
    // const httpContext = context.switchToHttp();

    // const req = httpContext.getRequest();
    // const res = httpContext.getResponse();

    const { req, res } = GqlExecutionContext.create(context).getContext();

    const checkJwt = promisify(
      jwt({
        secret: expressJwtSecret({
          cache: true,
          rateLimit: true,
          jwksRequestsPerMinute: 5,
          jwksUri: `${this.AUTH0_DOMAIN}.well-known/jwks.json`,
        }),
        audience: this.AUTH0_AUDIENCE,
        authority: this.AUTH0_DOMAIN,
        algorithms: ['RS256'],
      }),
    );
    try {
      await checkJwt(req, res);

      return true;
    } catch (error) {
      console.log(error);

      throw new UnauthorizedException(error);
    }
  }
}
