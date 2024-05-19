import { NextFunction, Request, Response } from 'express';
import { MyError } from '../errors/MyErrors.ts';
import errTemplate from '../errors/errTemplate.ts';
import jwt from 'jsonwebtoken';

const petErrorHandler = {
  catch(err: unknown, req: Request, res: Response, next: NextFunction) {
    if (err instanceof MyError) {
      return res.status(err.status).json(errTemplate.responseJson(err.message));
    }

    if (err instanceof jwt.TokenExpiredError) {
      return res.status(401).json(errTemplate.responseJson('인증이 만료되었습니다'));
    }

    if (err instanceof jwt.JsonWebTokenError) {
      return res.status(401).json('유효하지 않은 토큰입니다');
    }

    console.error(err);
    res.status(500).json(errTemplate.responseJson('에러 발생 관리자에게 문의주세요'));
  },
};

export default petErrorHandler;
