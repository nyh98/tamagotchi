import { NextFunction, Request, Response } from 'express';
import utils from '../../utils/utils.ts';
import userService from '../../service/userService.ts';
import petService from '../../service/petService.ts';
import foodService from '../../service/foodService.ts';

const userController = Object.freeze({
  join: async (req: Request, res: Response, next: NextFunction) => {
    const { uid, pwd, nickName } = req.body;

    const hashPwd = utils.hashPassword(pwd);
    try {
      const message = await userService.joinUser(uid, hashPwd, nickName);
      const user = await userService.getUser(uid, hashPwd);
      const pet = await petService.getPet();
      await userService.setUserPet(user.id, pet.id); //회원가입 시 펫 증정
      const food = await foodService.getFood(1);
      await userService.setUserfood(user.id, food.id); //기본 먹이 증정 로직

      res.status(201).json(message);
    } catch (e) {
      next(e);
    }
  },

  login: (req: Request, res: Response, next: NextFunction) => {
    const { uid, pwd } = req.body;

    const hashPwd = utils.hashPassword(pwd);

    // userService
    //   .getUser(uid, hashPwd)
    //   .then(rows => {
    //     const user = rows[0];
    //     res.json(user);
    //   })
    //   .catch(e => next(e));
  },
});

export default userController;
