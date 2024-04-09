import { NextFunction, Request, Response } from 'express';
import PetService from '../../service/PetService.ts';
import dotenv from 'dotenv';
import FoodService from '../../service/FoodService.ts';
dotenv.config();

const petController = Object.freeze({
  levelUp: async (req: Request, res: Response, next: NextFunction) => {
    const token = res.locals.tk;
    const userId = token.id;

    const petService = new PetService();
    return await petService
      .levelUpcheck(userId)
      .then(async changed => {
        if (changed) {
          await petService.setNextLvTime(userId);
        }
        res.sendStatus(200);
      })
      .catch(e => next(e));
  },

  hungryUp: async (req: Request, res: Response, next: NextFunction) => {
    const token = res.locals.tk;
    const userId = token.id;

    const petService = new PetService();
    return await petService
      .increaseHungerLevel(3, userId)
      .then(() => res.sendStatus(200))
      .catch(e => next(e));
  },

  hungryDown: async (req: Request, res: Response, next: NextFunction) => {
    const token = res.locals.tk;
    const userId = token.id;
    const { foodId } = req.body;

    try {
      const food = await new FoodService().getFood(foodId);
      await new PetService().decreaseHungerLevel(food.satisfy_hunger_lv, userId);
      return res.sendStatus(200);
    } catch (e) {
      next(e);
    }
  },
});

export default petController;
