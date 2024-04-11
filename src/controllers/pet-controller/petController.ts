import { NextFunction, Request, Response } from 'express';
import petService from '../../service/PetService.ts';
import dotenv from 'dotenv';
import foodService from '../../service/FoodService.ts';
dotenv.config();

class PetController {
  static async levelUp(req: Request, res: Response, next: NextFunction) {
    const token = res.locals.tk;
    const userId = token.id;

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
    const token = res.locals.tk;
    const userId = token.id;

    await petService
      .increaseHungerLevel(3, userId)
      .then(() => res.sendStatus(200))
      .catch(e => next(e));
  }

  static async hungryDown(req: Request, res: Response, next: NextFunction) {
    const token = res.locals.tk;
    const userId = token.id;
    const { foodId } = req.body;

    try {
      const food = await foodService.getFood(foodId);
      await petService.decreaseHungerLevel(food.satisfy_hunger_lv, userId);
      res.sendStatus(200);
    } catch (e) {
      next(e);
    }
  }
}

export default PetController;
