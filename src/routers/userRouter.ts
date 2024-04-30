import express from 'express';
import UserValidator from '../validators/userValidator.ts';
import UserController from '../controllers/userController.ts';
import UncaughtErrorHandler from '../errors/UncaughtErrorHandler.ts';
import UserErrorHandler from '../errors/UserErrorHandler.ts';

const userRouter = express.Router();

userRouter.post('/join', UserValidator.join, UserController.join, UserErrorHandler.join);

userRouter.post('/login', UserValidator.login, UserController.login, UserErrorHandler.login);

userRouter.use(UncaughtErrorHandler.responseError);
userRouter.use((req, res) => {
  res.send('아무것도 없음');
}); //404페이지 만들어야됨

export default userRouter;
