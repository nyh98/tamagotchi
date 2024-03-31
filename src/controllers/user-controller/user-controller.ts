import { NextFunction, Request, Response } from 'express';
import utils from '../../utils/utils.ts';
import sqlTemplate from '../../db/connection/sqlTemplate.ts';

const userController = Object.freeze({
  join: (req: Request, res: Response, next: NextFunction) => {
    const { uid, pwd, nickName } = req.body;

    const hashPwd = utils.hashPassword(pwd);
    sqlTemplate
      .modifyQuery(
        'INSERT INTO users (uid, pwd, nick_name) VALUES (?, ?, ?)',
        uid,
        hashPwd,
        nickName
      )
      .then(() => res.json({ message: `${nickName} 님 회원가입 완료` }))
      .catch(e => next(e));
  },
});

export default userController;
