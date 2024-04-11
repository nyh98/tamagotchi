import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import errTemplate from '../../error/errTemplate.ts';

class PetValidator {
  static auth(req: Request, res: Response, next: NextFunction) {
    const token = req.cookies.tk;
    if (!token) {
      return res.status(401).json(errTemplate.queryErr('로그인을 해주세요'));
    }
    jwt.verify(token, process.env.TOKEN_KEY || 'noKey', {}, (err, data) => {
      if (err) return next(err);

      if (!data) {
        return res.status(404).json(errTemplate.queryErr('토큰이 비어있음'));
      }
      res.locals.tk = data;
      next('route');
    });
  }
  static hungryDown(req: Request, res: Response, next: NextFunction) {
    const { foodId } = req.body;
    if (!foodId) return res.status(400).json(errTemplate.queryErr('필요한 데이터가 없습니다'));

    if (typeof foodId !== 'number') return res.status(400).json(errTemplate.queryErr('데이터가 정확하지 않습니다'));

    next();
  }
}

export default PetValidator;
