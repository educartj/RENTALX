import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

import auth from '@config/auth';
import { AppError } from '@shared/errors';

interface IPayload {
  sub: string;
}

class EnsureAuthenticatedMiddleware {
  async handle(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      throw new AppError('missing_auth_token', 'UNAUTHORIZED');
    }

    const [, token] = authHeader.split(' ');

    try {
      const { sub: user_id } = verify(token, auth.secret_token) as IPayload;

      req.user = {
        id: user_id,
      };

      return next();
    } catch {
      throw new AppError('invalid_token', 'UNAUTHORIZED');
    }
  }
}

export { EnsureAuthenticatedMiddleware };
