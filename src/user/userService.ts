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

  async getPetById(userId: string | Types.ObjectId, petId: string | Types.ObjectId) {
    const data = await User.findOne({ _id: userId, 'pets._id': petId }, { 'pets.$': 1 });

    if (!data) {
      throw new NotFoundError('일치하는 정보가 없습니다', 404);
    }

    return data.pets[0];
  },
};

export default userService;
