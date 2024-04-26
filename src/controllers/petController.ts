import { NextFunction, Request, Response } from 'express';
import petService from '../service/PetService.ts';
import dotenv from 'dotenv';
import foodService from '../service/FoodService.ts';
import requestService from '../service/RequestService.ts';
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

    try {
      const food = await foodService.getFood(foodId);
      await petService.decreaseHungerLevel(food.satisfy_hunger_lv, userId);
      res.sendStatus(200);
    } catch (e) {
      next(e);
    }
  }

  static async updateRequestTimeAndStoolCount(req: Request, res: Response, next: NextFunction) {
    const userId = res.locals.userId;

    try {
      const stoolCount = await petService.calculateStoolCount(userId);
      if (stoolCount) {
        await petService.updateStoolCount(userId, stoolCount);
      }

      await requestService.createOrUpdateTime(userId);
      next();
    } catch (e) {
      next(e);
    }
  }
}

export default PetController;
