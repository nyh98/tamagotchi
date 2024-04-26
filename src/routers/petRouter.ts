import express from 'express';
import PetController from '../controllers/petController.ts';
import PetError from '../error/petError.ts';
import PetValidator from '../validators/petValidator.ts';
import AuthValidator from '../validators/authValidator.ts';
import AuthError from '../error/authError.ts';

const petRouter = express.Router();

petRouter.use(AuthValidator.auth, AuthError.auth);
petRouter.use(PetController.updateRequestTimeAndStoolCount);
petRouter.use(PetValidator.checkIfPetIsDead);

petRouter.get('/', PetController.getPet);

petRouter.put('/levelup', PetController.levelUp);

petRouter.put('/hungry-down', PetValidator.hungryDown, PetController.hungryDown, PetError.hungry);

petRouter.put('/hungry-up', PetController.hungryUp, PetError.hungry);

petRouter.use(PetError.handleUncaughtErrors);

export default petRouter;
