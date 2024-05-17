import { NextFunction, Request, Response } from 'express';
import petService from '../service/PetService.ts';
import { ValidatorError } from '../errors/MyErrors.ts';

class PetValidator {
  static hungryDown(req: Request, res: Response, next: NextFunction) {
    const { foodId } = req.body;
    if (!foodId) {
      const err = new ValidatorError('필요한 데이터가 없습니다', 400);
      return next(err);
    }

    if (typeof foodId !== 'number') {
      const err = new ValidatorError('데이터가 정확하지 않습니다', 400);
      next(err);
    }

    next();
  }

  static checkDecreaseValue(req: Request, res: Response, next: NextFunction) {
    const { decreaseValue } = req.body;
    if (!decreaseValue) {
      const err = new ValidatorError('감소할 값이 없습니다', 400);
      return next(err);
    }

    if (decreaseValue !== 'number') {
      const err = new ValidatorError('데이터가 정확하지 않습니다', 400);
      return next(err);
    }

    next();
  }

  static async checkIfPetIsDead(req: Request, res: Response, next: NextFunction) {
    const userId = res.locals.userId;

    try {
      const pet = await petService.getPetFromUser(userId);

      if (pet.stool_count >= 5) {
        await petService.markPetAsDead(userId);
      }

      next();
    } catch (e) {
      next(e);
    }
  }
}

export default PetValidator;
