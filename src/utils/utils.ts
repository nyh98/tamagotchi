import crypto from 'crypto';

const utils = {
  hashPassword(pwd: string) {
    return crypto.createHash('sha512').update(pwd).digest('base64');
  },

  randomPetNumber() {
    const totalPets = 5;
    const randomNumber = Math.floor(Math.random() * totalPets + 1);
    return randomNumber;
  },

  /**모든 값이 문자열이면 true를 반환 */
  isValidStringData(...values: unknown[]) {
    return values.every(value => typeof value === 'string');
  },
};

export default utils;
