import { NextFunction, Request, Response } from 'express';
import errTemplate from './errTemplate.ts';
import { MyError, UncaughtError } from './MyErrors.ts';

class AuthErrorHandler {
  static auth(err: unknown, req: Request, res: Response, next: NextFunction) {
    if (err instanceof MyError) {
      return res.status(err.status).json(errTemplate.responseJson(err.message));
    }

    const uncaughtError = new UncaughtError(err);
    next(uncaughtError);
  }
}

export default AuthErrorHandler;
