import express from 'express';
import errTemplate from '../error/errTemplate.ts';
import utils from '../utils/utils.ts';
import sqlTemplate from '../utils/sqlTemplate.ts';

const userRouter = express.Router();

userRouter.post('/join', (req, res) => {
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
  sqlTemplate
    .modifyQuery(
      'INSERT INTO users (uid, pwd, nick_name) VALUES (?, ?, ?)',
      uid,
      hashPwd,
      nickName
    )
    .then(() => res.json({ message: `${nickName} 님 회원가입 완료` }))
    .catch(e =>
      res
        .status(424)
        .json(
          errTemplate.queryErr('회원가입 실패 중복된 아이디가 있을 수 있습니다')
        )
    );
});

userRouter.post('/login', (req, res) => {
  const { uid, pwd, nickName } = req.body;

  const isValidData = utils.isValidStringData(uid, pwd, nickName);
  if (!isValidData) {
    return res
      .status(400)
      .json(errTemplate.queryErr('데이터가 정확하지 않습니다'));
  }

  //db에서 회원 조회
  //..

  //유저 예시
  const user = {
    id: 'testA2fsxx2',
    nickName: 'test',
    currentPet: {
      name: '슬라임',
      Phase: 1,
      hungry: 2,
      bored: 0,
      nextLevel: '2024-03-30 20:00:00',
    },
    petCatalog: [{ name: '도마뱀' } /**..... */],
  };

  res.json(user);
});
export default userRouter;
