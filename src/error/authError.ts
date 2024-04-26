import { NextFunction, Request, Response } from 'express';
import { VerifyErrors } from 'jsonwebtoken';
import errTemplate from './errTemplate.ts';

class AuthError {
  static auth(err: VerifyErrors | Error, req: Request, res: Response, next: NextFunction) {
    if (err.message === 'jwt expired') {
      return res.status(401).json(errTemplate.queryErr('인증이 만료되었습니다'));
    }

    if (err.message === '로그인을 해주세요') {
      return res.status(401).json(errTemplate.queryErr(err.message));
    }

    if (err.message === '유효하지 않은 접근') {
      return res.status(404).json(errTemplate.queryErr(err.message));
    }

    next(err);
  }
}

export default AuthError;
