import express from 'express';
import errTemplate from '../error/errTemplate.ts';
import utils from '../utils/utils.ts';

const userRouter = express.Router();

userRouter.post('/join', (req, res, next) => {
  const { uid, pwd, nickName } = req.body;

  const isValidData = utils.isValidStringData(uid, pwd, nickName);
  if (!isValidData) {
    return res
      .status(400)
      .json(errTemplate.queryErr('데이터가 정확하지 않습니다'));
  }

  if (uid.length < 4 || pwd.length < 4 || nickName.length < 2) {
    return res
      .status(400)
      .json(
        errTemplate.queryErr(
          '아이디, 비밀번호는 4글자 이상 닉네임은 2글자 이상이여야 합니다'
        )
      );
  }

  const hashPwd = utils.hashPassword(pwd);

  res.json({ message: `${nickName} 님 회원가입 완료` });
});

export default userRouter;
