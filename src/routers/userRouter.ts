import express from 'express';
import UserValidator from '../validators/userValidator.ts';
import UserController from '../controllers/userController.ts';
import UserError from '../error/userError.ts';

const userRouter = express.Router();

userRouter.post('/join', UserValidator.join, UserController.join, UserError.join);

userRouter.post('/login', UserValidator.login, UserController.login, UserError.login);

export default userRouter;
