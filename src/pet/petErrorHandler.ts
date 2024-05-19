import { NextFunction, Request, Response } from 'express';
import { MyError } from '../errors/MyErrors.ts';
import errTemplate from '../errors/errTemplate.ts';

const petErrorHandler = {
  catch(err: unknown, req: Request, res: Response, next: NextFunction) {
    if (err instanceof MyError) {
      res.status(err.status).json(errTemplate.responseJson(err.message));
    }

    console.error(err);
    res.status(500).json(errTemplate.responseJson('에러 발생 관리자에게 문의주세요'));
  },
};

export default petErrorHandler;
