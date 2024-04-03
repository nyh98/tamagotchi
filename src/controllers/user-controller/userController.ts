import { NextFunction, Request, Response } from 'express';
import utils from '../../utils/utils.ts';
import userTransaction from '../../transaction/userTransaction.ts';
import userService from '../../service/userService.ts';

const userController = Object.freeze({
  join: async (req: Request, res: Response, next: NextFunction) => {
    const { uid, pwd, nickName } = req.body;

    const hashPwd = utils.hashPassword(pwd);

    return userTransaction
      .join(uid, hashPwd, nickName)
      .then(msg => res.status(201).json(msg))
      .catch(e => next(e));
  },

  login: (req: Request, res: Response, next: NextFunction) => {
    const { uid, pwd } = req.body;

    const hashPwd = utils.hashPassword(pwd);

    userService
      .login(uid, hashPwd)
      .then(user => res.json(user))
      .catch(e => next(e));
  },
});

export default userController;
