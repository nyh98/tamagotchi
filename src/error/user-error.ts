import { NextFunction, Request, Response } from 'express';
import errTemplate from './errTemplate.ts';

const userError = Object.freeze({
  //회원가입 에러
  join: (err: any, req: Request, res: Response, next: NextFunction) => {
    if (err.code === 'ER_DUP_ENTRY') {
      res.status(409).json(errTemplate.queryErr('이미 사용중인 아이디 입니다'));
      return;
    }

    res
      .status(400)
      .json(errTemplate.queryErr('회원가입 실패 관리자에게 문의하세요'));
  },
});

export default userError;
