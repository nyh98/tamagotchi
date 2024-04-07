import { NextFunction, Request, Response } from 'express';
import { VerifyErrors } from 'jsonwebtoken';
import errTemplate from './errTemplate.ts';

const petError = Object.freeze({
  levelUp: (err: VerifyErrors | Error, req: Request, res: Response, next: NextFunction) => {
    if (err.message === 'jwt expired') {
      return res.status(401).json(errTemplate.queryErr('인증이 만료되었습니다'));
    }

    res.status(404).json(errTemplate.queryErr('에러발생 관리자에게 문의주세요'));
  },
});

export default petError;
