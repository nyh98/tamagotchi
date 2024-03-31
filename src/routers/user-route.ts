import express from 'express';
import errTemplate from '../error/errTemplate.ts';
import utils from '../utils/utils.ts';
import userValidator from '../controllers/user-controller/user-validator.ts';
import userController from '../controllers/user-controller/user-controller.ts';
import userError from '../error/user-error.ts';

const userRouter = express.Router();

userRouter.post(
  '/join',
  userValidator.join,
  userController.join,
  userError.join
);

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
