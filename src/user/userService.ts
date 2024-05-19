import { Types } from 'mongoose';
import User from '../db/schema/User.ts';
import { NotFoundError } from '../errors/MyErrors.ts';

const userService = {
  async updateRequstTime(userId: string | Types.ObjectId) {
    return User.updateOne({ _id: userId }, { $set: { lastRequest: new Date() } });
  },

  async getUser(userId: string | Types.ObjectId) {
    const user = await User.findById(userId);
    if (!user) {
      throw new NotFoundError('일치하는 정보가 없습니다', 404);
    }
    return user;
  },
};

export default userService;
// async setFoodForUser(userId: number, foodId: number, conn?: PoolConnection) {
//     await this.SqlTemplate.modifyQuery(
//       'INSERT INTO user_foods (user_id, food_id) VALUES (? , ?)',
//       [userId, foodId],
//       conn
//     );
//   }

//   async setPetForUser(userId: number, petId: number, conn?: PoolConnection) {
//     await this.SqlTemplate.modifyQuery(
//       'INSERT INTO user_current_pet (user_id, pet_id) VALUES (?, ?)',
//       [userId, petId],
//       conn
//     );
//   }

//   async setUser(uid: string, hashPwd: string, nickName: string, conn?: PoolConnection) {
//     await this.SqlTemplate.modifyQuery(
//       'INSERT INTO users (uid, pwd, nick_name) VALUES (?, ?, ?)',
//       [uid, hashPwd, nickName],
//       conn
//     );
//   }

//   async getUser(uid: string, hashPwd: string, conn?: PoolConnection) {
//     const [user] = await this.SqlTemplate.getQuery(
//       'SELECT id, nick_name AS nickName FROM users WHERE uid = ? AND pwd = ?',
//       [uid, hashPwd],
//       conn
//     );
//     if (!user) throw new NotFoundError('아이디 또는 비밀번호가 일치하지 않습니다', 404);
//     return user;
//   }

//   async joinUser(uid: string, hashPwd: string, nickName: string) {
//     await this.SqlTemplate.transaction(async conn => {
//       await this.setUser(uid, hashPwd, nickName, conn);
//       const user = await this.getUser(uid, hashPwd, conn);
//       const pet = await petService.getRandomPet(conn);
//       const food = await foodService.getFood(1, conn);
//       await this.setPetForUser(user.id, pet.id, conn);
//       await this.setFoodForUser(user.id, food.id, conn);
//       await requestService.createRequestTime(user.id, conn);
//     });
//   }
