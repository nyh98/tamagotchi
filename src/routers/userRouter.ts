import express from 'express';
import userValidator from '../controllers/user-controller/userValidator.ts';
import userController from '../controllers/user-controller/userController.ts';
import userError from '../error/userError.ts';

const userRouter = express.Router();

userRouter.post(
  '/join',
  userValidator.join,
  userController.join,
  userError.join
);

userRouter.post(
  '/login',
  userValidator.login,
  userController.login,
  userError.login
);

export default userRouter;
