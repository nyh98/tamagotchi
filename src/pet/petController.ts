import { NextFunction, Request, Response } from 'express';
import petService from './petService.ts';
import userService from '../user/userService.ts';

const petController = {
  async getRandomPet(req: Request, res: Response, next: NextFunction) {
    const pet = await petService.getRandomPet('userId');
  },

  async updatePetStatus(req: Request, res: Response, next: NextFunction) {
    const userId = res.locals.userId;

    try {
      const user = await userService.getUser(userId);
      const stoolCount = petService.calculateStoolCount(user.lastRequest.getTime());
      if (stoolCount) {
        await user.updateOne(
          { $set: { 'pets.$[pet].stoolCount': stoolCount } },
          { arrayFilters: [{ 'pet.stoolCount': { $lt: stoolCount } }] }
        );
      }
      await petService.checkIfPetIsDead(user._id);
      await petService.checkLvUp(user._id);
      await userService.updateRequstTime(user._id);
    } catch (e) {
      next(e);
    }
  },
};

export default petController;
