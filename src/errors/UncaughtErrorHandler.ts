import { NextFunction, Request, Response } from 'express';
import { UncaughtError } from './MyErrors.ts';
import errTemplate from './errTemplate.ts';

class UncaughtErrorHandler {
  constructor(err: UncaughtError) {
    this.loging(err);
  }

  loging(err: UncaughtError) {
    //로깅 로직
  }

  static responseError(err: UncaughtError, req: Request, res: Response, next: NextFunction) {
    console.error(err); //로깅해야함
    return res.status(err.status).json(errTemplate.responseJson(err.message));
  }
}

export default UncaughtErrorHandler;
