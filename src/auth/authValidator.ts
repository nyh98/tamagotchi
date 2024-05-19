import { NextFunction, Request, Response } from 'express';
import { AuthError } from '../errors/MyErrors.ts';
import tokenManager from '../token/tokenManager.ts';

const authValidator = {
  auth(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization;

    if (!token) {
      const err = new AuthError('로그인을 해주세요', 401);
      return next(err);
    }

    try {
      const decoed = tokenManager.verify(token);
      res.locals.userId = decoed.userId;
      next();
    } catch (e) {
      next(e);
    }
  },
};

export default authValidator;
