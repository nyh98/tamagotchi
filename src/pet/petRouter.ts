import express from 'express';
import authValidator from '../auth/authValidator.ts';
import petController from './petController.ts';
import petErrorHandler from './petErrorHandler.ts';

const petRouter = express.Router();

petRouter.use(authValidator.auth);
petRouter.post('/check', petController.updatePetStatus);

petRouter.get('/', petController.getRandomPet);

petRouter.use(petErrorHandler.catch);

export default petRouter;
