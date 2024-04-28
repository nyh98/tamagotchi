import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { AuthError } from '../errors/MyErrors.ts';

class AuthValidator {
  static auth(req: Request, res: Response, next: NextFunction) {
    const token = req.cookies.tk;
    if (!token) {
      const err = new AuthError('로그인을 해주세요', 400);
      return next(err);
    }

    jwt.verify(token, process.env.TOKEN_KEY || 'noKey', {}, (err, data) => {
      if (err && err instanceof jwt.TokenExpiredError) {
        const expiredErr = new AuthError('인증이 만료되었습니다', 401);
        return next(expiredErr);
      }

      if (typeof data === 'string' || !data) {
        const err = new AuthError('유효하지 않은 접근', 401);
        return next(err);
      }

      const userId = data.id;
      res.locals.userId = userId;
      next();
    });
  }
}

export default AuthValidator;
