import { NextFunction, Request, Response } from 'express';
import errTemplate from './errTemplate.ts';
import { MyError, UncaughtError } from './MyErrors.ts';
import { SqlError } from 'mariadb';

class UserErrorHandler {
  //회원가입 에러
  static join(err: unknown, req: Request, res: Response, next: NextFunction) {
    if (err instanceof SqlError && err.code === 'ER_DUP_ENTRY') {
      return res.status(400).json(errTemplate.responseJson('이미 사용중인 아이디 입니다'));
    }

    if (err instanceof MyError) {
      return res.status(err.status).json(errTemplate.responseJson(err.message));
    }

    const uncaughtError = new UncaughtError(err);
    next(uncaughtError);
  }

  static login(err: unknown, req: Request, res: Response, next: NextFunction) {
    if (err instanceof SqlError) {
      console.error(err); //로깅 해야함
      return res.status(404).json(errTemplate.responseJson('로그인 실패 관리자에게 문의하세요'));
    }

    if (err instanceof MyError) {
      return res.status(err.status).json(errTemplate.responseJson(err.message));
    }

    const uncaughtError = new UncaughtError(err);
    next(uncaughtError);
  }
}

export default UserErrorHandler;
