import { NextFunction, Request, Response } from 'express';
import utils from '../../utils/utils.ts';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import UserService from '../../service/UserService.ts';
dotenv.config();

const userController = Object.freeze({
  join: async (req: Request, res: Response, next: NextFunction) => {
    const { uid, pwd, nickName } = req.body;

    const hashPwd = utils.hashPassword(pwd);

    return await new UserService()
      .joinUser(uid, hashPwd, nickName)
      .then(() =>
        res.status(201).json({ message: `${nickName} 님 회원가입 완료` })
      )
      .catch(e => next(e));
  },

  login: async (req: Request, res: Response, next: NextFunction) => {
    const { uid, pwd } = req.body;

    const hashPwd = utils.hashPassword(pwd);

    return await new UserService()
      .getUser(uid, hashPwd)
      .then(user => {
        const token = jwt.sign({ id: user.id }, process.env.TOKEN_KEY || '', {
          algorithm: 'HS256',
          expiresIn: 60 * 60 * 24 * 14,
        });
        const cookieOption = { httpOnly: true };
        res.cookie('tk', token, cookieOption).json(user);
      })
      .catch(e => next(e));
  },
});

export default userController;
