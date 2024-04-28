import express from 'express';
import PetController from '../controllers/petController.ts';
import PetValidator from '../validators/petValidator.ts';
import AuthValidator from '../validators/authValidator.ts';
import UncaughtErrorHandler from '../errors/UncaughtErrorHandler.ts';
import AuthErrorHandler from '../errors/AuthErrorHandler.ts';
import PetErrorHandler from '../errors/PetErrorHandler.ts';

const petRouter = express.Router();

petRouter.use(AuthValidator.auth, AuthErrorHandler.auth);
petRouter.use(PetController.updateRequestTimeAndStoolCount);
petRouter.use(PetValidator.checkIfPetIsDead);

petRouter.get('/', PetController.getPet);

petRouter.put('/levelup', PetController.levelUp);

petRouter.put('/hungry-down', PetValidator.hungryDown, PetController.hungryDown, PetErrorHandler.hungry);

petRouter.put('/hungry-up', PetController.hungryUp, PetErrorHandler.hungry);

petRouter.use(UncaughtErrorHandler.responseError);

export default petRouter;
