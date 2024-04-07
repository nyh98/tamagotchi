import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import errTemplate from '../../error/errTemplate.ts';
import PetService from '../../service/PetService.ts';
import dotenv from 'dotenv';
dotenv.config();

const petController = Object.freeze({
  levelUp: async (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.tk;
    if (!token) {
      return res.status(400).json(errTemplate.queryErr('로그인을 해주세요'));
    }

    jwt.verify(token, process.env.TOKEN_KEY || 'noKey', {}, async (err, data) => {
      if (err) return next(err);

      if (!data) {
        return res.status(404).json(errTemplate.queryErr('다시 로그인 해주세요'));
      }

      if (typeof data !== 'string') {
        const petService = new PetService();

        return await petService
          .levelUpcheck(data.id)
          .then(async changed => {
            console.log(changed);
            if (changed) {
              await petService.setNextLvTime(data.id);
            }
            res.sendStatus(200);
          })
          .catch(e => next(e));
      }
    });
  },
});

export default petController;
