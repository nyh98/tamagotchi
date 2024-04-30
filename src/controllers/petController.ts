import { NextFunction, Request, Response } from 'express';
import petService from '../service/PetService.ts';
import dotenv from 'dotenv';
dotenv.config();

class PetController {
  static async getPet(req: Request, res: Response, next: NextFunction) {
    const userId = res.locals.userId;

    await petService
      .getPetFromUser(userId)
      .then(pet => res.status(200).json(pet))
      .catch(e => next(e));
  }
  static async levelUp(req: Request, res: Response, next: NextFunction) {
    const userId = res.locals.userId;

    await petService
      .levelUpcheck(userId)
      .then(async changed => {
        if (changed) {
          await petService.setNextLvTime(userId);
        }
        res.sendStatus(200);
      })
      .catch(e => next(e));
  }

  static async hungryUp(req: Request, res: Response, next: NextFunction) {
    const userId = res.locals.userId;

    await petService
      .increaseHungerLevel(3, userId)
      .then(() => res.sendStatus(200))
      .catch(e => next(e));
  }

  static async hungryDown(req: Request, res: Response, next: NextFunction) {
    const userId = res.locals.userId;
    const { foodId } = req.body;

    await petService
      .decreaseHungerWithFood(userId, foodId)
      .then(() => res.sendStatus(200))
      .catch(e => next(e));
  }

  /**
   * 엔드 포인트 아님
   * 펫 관련 요청시 펫의 상태와 마지막 요청시간을 업데이트 하는 미들웨어 로직
   */
  static async updateRequestTimeAndStoolCount(req: Request, res: Response, next: NextFunction) {
    const userId = res.locals.userId;

    await petService
      .updateRequestTimeAndStoolCount(userId)
      .then(() => next())
      .catch(e => next(e));
  }
}

export default PetController;
