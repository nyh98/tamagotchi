import jwt from 'jsonwebtoken';
import { ValidatorError } from '../errors/MyErrors.ts';

const tokenManager = {
  create(userId: string) {
    const token = jwt.sign({ userId }, process.env.TOKEN_KEY!, { algorithm: 'HS512' });
    return token;
  },

  verify(token: string) {
    const decoded = jwt.verify(token, process.env.TOKEN_KEY!);
    if (typeof decoded === 'string') {
      throw new ValidatorError('유효하지 않은 토큰', 401);
    }

    return decoded;
  },
};

export default tokenManager;
