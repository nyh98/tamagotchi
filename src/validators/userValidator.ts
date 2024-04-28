import { NextFunction, Request, Response } from 'express';
import utils from '../utils/utils.ts';
import { ValidatorError } from '../errors/MyErrors.ts';

class UserValidator {
  static join(req: Request, res: Response, next: NextFunction) {
    const { uid, pwd, nickName } = req.body;

    //문자열인지 확인
    if (utils.isNotString(uid, pwd, nickName)) {
      const err = new ValidatorError('데이터가 정확하지 않습니다', 400);
      return next(err);
    }

    //아이디 4글자, 비밀번호 4글자, 닉네임 2글자 이상이여야 함
    if (uid.length < 4 || pwd.length < 4 || nickName.length < 2) {
      const err = new ValidatorError('아이디, 비밀번호는 4글자 이상 닉네임은 2글자 이상이여야 합니다', 400);
      return next(err);
    }

    //아이디 30글자, 비밀번호 12글자,닉네임 8글자 이하여야 함
    if (uid.length > 30 || pwd.length > 12 || nickName.length > 8) {
      const err = new ValidatorError('아이디 30자 이하, 비밀번호 12자 이하, 닉네임 8자 이하여야 합니다', 400);
      return next(err);
    }

    next();
  }

  static login(req: Request, res: Response, next: NextFunction) {
    const { uid, pwd } = req.body;

    //문자열인지 확인
    if (utils.isNotString(uid, pwd)) {
      const err = new ValidatorError('데이터가 정확하지 않습니다', 400);
      return next(err);
    }

    //아이디 4글자, 비밀번호 4글자 이상이여야 함
    if (uid.length < 4 || pwd.length < 4) {
      const err = new ValidatorError('아이디, 비밀번호는 4글자 이상이여야 합니다', 400);
      return next(err);
    }

    //아이디 30글자, 비밀번호 12글자 이하여야 함
    if (uid.length > 30 || pwd.length > 12) {
      const err = new ValidatorError('아이디 30자 이하, 비밀번호 12자 이하여야 합니다', 400);
      return next(err);
    }

    return next();
  }
}

export default UserValidator;
