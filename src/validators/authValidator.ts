import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import requestService from '../service/RequestService.ts';

class AuthValidator {
  static auth(req: Request, res: Response, next: NextFunction) {
    const token = req.cookies.tk;
    if (!token) return next(new Error('로그인을 해주세요'));

    jwt.verify(token, process.env.TOKEN_KEY || 'noKey', {}, (err, data) => {
      if (err) return next(err);

      if (typeof data === 'string' || !data) return next(new Error('유효하지 않은 접근'));

      const userId = data.id;
      res.locals.userId = userId;
      next();
    });
  }
}

export default AuthValidator;
