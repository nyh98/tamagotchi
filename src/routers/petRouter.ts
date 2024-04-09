import express from 'express';
import petController from '../controllers/pet-controller/petController.ts';
import petError from '../error/petError.ts';
import petValidator from '../controllers/pet-controller/petValidator.ts';

const petRouter = express.Router();

petRouter.put('/levelup', petController.levelUp, petError.level);

petRouter.put('/hungry-down', petValidator.hungryDown, petController.hungryDown, petError.hungry);

petRouter.put('/hungry-up', petController.hungryUp, petError.hungry);

export default petRouter;
