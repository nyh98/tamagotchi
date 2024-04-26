import { NextFunction, Request, Response } from 'express';
import errTemplate from './errTemplate.ts';

class PetError {
  static handleUncaughtErrors(err: Error, req: Request, res: Response, next: NextFunction) {
    console.error(err);
    res.status(404).json(errTemplate.queryErr('에러발생 관리자에게 문의주세요'));
  }

  static hungry(err: Error, req: Request, res: Response, next: NextFunction) {
    if (err.message == 'Not found') {
      return res.status(404).json(errTemplate.queryErr('존재하지 않는 데이터가 있습니다'));
    }

    next(err);
  }
}

export default PetError;
