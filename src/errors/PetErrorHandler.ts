import { NextFunction, Request, Response } from 'express';
import errTemplate from './errTemplate.ts';
import { MyError, UncaughtError } from './MyErrors.ts';
import { SqlError } from 'mariadb';

class PetErrorHandler {
  static hungry(err: unknown, req: Request, res: Response, next: NextFunction) {
    if (err instanceof SqlError) {
      console.error(err); //로깅 해야함
      return res.status(404).json(errTemplate.responseJson('db오류'));
    }

    if (err instanceof MyError) {
      return res.status(err.status).json(errTemplate.responseJson(err.message));
    }

    const uncaughtError = new UncaughtError(err);
    next(uncaughtError);
  }
}

export default PetErrorHandler;
