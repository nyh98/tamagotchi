import { NextFunction, Request, Response } from 'express';
import errTemplate from '../error/errTemplate.ts';
import petService from '../service/PetService.ts';

class petValidator {
  static hungryDown(req: Request, res: Response, next: NextFunction) {
    const { foodId } = req.body;
    if (!foodId) return res.status(400).json(errTemplate.queryErr('필요한 데이터가 없습니다'));

    if (typeof foodId !== 'number') return res.status(400).json(errTemplate.queryErr('데이터가 정확하지 않습니다'));

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

export default petValidator;
