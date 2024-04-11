import express from 'express';
import PetController from '../controllers/pet-controller/petController.ts';
import PetError from '../error/petError.ts';
import PetValidator from '../controllers/pet-controller/petValidator.ts';

const petRouter = express.Router();

petRouter.put('/levelup', PetController.levelUp, PetError.level);

petRouter.put('/hungry-down', PetValidator.hungryDown, PetController.hungryDown, PetError.hungry);

petRouter.put('/hungry-up', PetController.hungryUp, PetError.hungry);

export default petRouter;
