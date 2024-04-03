import { NextFunction, Request, Response } from 'express';
import utils from '../../utils/utils.ts';
import userTransaction from '../../transaction/userTransaction.ts';
import userService from '../../service/userService.ts';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const userController = Object.freeze({
  join: async (req: Request, res: Response, next: NextFunction) => {
    const { uid, pwd, nickName } = req.body;

    const hashPwd = utils.hashPassword(pwd);

    return userTransaction
      .join(uid, hashPwd, nickName)
      .then(msg => res.status(201).json(msg))
      .catch(e => next(e));
  },

  login: async (req: Request, res: Response, next: NextFunction) => {
    const { uid, pwd } = req.body;

    const hashPwd = utils.hashPassword(pwd);

    try {
      const user = await userService.login(uid, hashPwd);

      const token = jwt.sign({ id: user.id }, process.env.TOKEN_KEY || '', {
        algorithm: 'HS256',
        expiresIn: 60 * 60 * 24 * 14,
      });
      const cookieOption = { httpOnly: true };
      res.cookie('tk', token, cookieOption).json(user);
    } catch (e) {
      return next(e);
    }
  },
});

export default userController;
