import { CookieOptions, NextFunction, Request, Response } from 'express';
import utils from '../utils/utils.ts';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import userService from '../service/UserService.ts';
dotenv.config();

class UserController {
  static async join(req: Request, res: Response, next: NextFunction) {
    const { uid, pwd, nickName } = req.body;

    const hashPwd = utils.hashPassword(pwd);

    return await userService
      .joinUser(uid, hashPwd, nickName)
      .then(() => res.status(201).json({ message: `${nickName} 님 회원가입 완료` }))
      .catch(e => next(e));
  }

  static async login(req: Request, res: Response, next: NextFunction) {
    const { uid, pwd } = req.body;

    const hashPwd = utils.hashPassword(pwd);

    return await userService
      .getUser(uid, hashPwd)
      .then(user => {
        const token = jwt.sign({ id: user.id }, process.env.TOKEN_KEY!, {
          algorithm: 'HS256',
          expiresIn: 60 * 60 * 24 * 14,
        });
        const cookieOption: CookieOptions = { httpOnly: true, secure: false };
        res.cookie('tk', token, cookieOption).json(user);
      })
      .catch(e => next(e));
  }
}

export default UserController;
