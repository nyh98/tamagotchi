import express from 'express';
import petController from '../controllers/pet-controller/petController.ts';
import petError from '../error/petError.ts';

const petRouter = express.Router();

petRouter.put('/levelup', petController.levelUp, petError.levelUp);

export default petRouter;
