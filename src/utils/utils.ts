import crypto from 'crypto';

const utils = {
  hashPassword(pwd: string) {
    return crypto.createHash('sha512').update(pwd).digest('base64');
  },

  /**모든 값이 문자열이면 true를 반환 */
  isValidStringData(...values: unknown[]) {
    return values.every(value => typeof value === 'string');
  },
};

export default utils;
