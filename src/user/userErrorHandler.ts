import { NextFunction, Request, Response } from 'express';

const userErrorHandler = {
  catch(err: unknown, req: Request, res: Response, next: NextFunction) {},
};

export default userErrorHandler;
