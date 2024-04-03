import { NextFunction, Request, Response } from 'express';
import errTemplate from './errTemplate.ts';

const userError = Object.freeze({
  //회원가입 에러
  join: (err: any, req: Request, res: Response, next: NextFunction) => {
    if (err.code === 'ER_DUP_ENTRY') {
      res.status(409).json(errTemplate.queryErr('이미 사용중인 아이디 입니다'));
      return;
    }

    if (err.message === 'Not found') {
      return res
        .status(404)
        .json(errTemplate.queryErr('존재하지 않는 데이터가 있습니다'));
    }

    res
      .status(400)
      .json(errTemplate.queryErr('회원가입 실패 관리자에게 문의하세요'));
  },

  login: (err: any, req: Request, res: Response, next: NextFunction) => {
    if (err.message === 'Not found') {
      return res
        .status(404)
        .json(
          errTemplate.queryErr('아이디, 비밀번호를 다시 한번 확인해 주세요')
        );
    }
    res
      .status(404)
      .json(errTemplate.queryErr('로그인 실패 관리자에게 문의하세요'));
  },
});

export default userError;
