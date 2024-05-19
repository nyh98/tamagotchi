import express from 'express';
import authValidator from '../auth/authValidator.ts';
import userController from './userController.ts';
import userErrorHandler from './userErrorHandler.ts';

const userRouter = express.Router();

userRouter.post('/join', authValidator.auth, userController.join);

userRouter.post('/login');

userRouter.use(userErrorHandler.catch);

export default userRouter;
