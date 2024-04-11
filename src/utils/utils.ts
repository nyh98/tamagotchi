import crypto from 'crypto';

const utils = {
  hashPassword(pwd: string) {
    return crypto.createHash('sha512').update(pwd).digest('base64');
  },

  isNotString(...values: unknown[]) {
    return values.every(value => typeof value !== 'string');
  },
};

export default utils;
