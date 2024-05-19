import { NextFunction, Request, Response } from 'express';

const userController = {
  async join(req: Request, res: Response, next: NextFunction) {},

  async login(req: Request, res: Response, next: NextFunction) {
    const { uid, pwd } = req.body;
  },
};

export default userController;
