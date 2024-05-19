import { Types } from 'mongoose';
import { Food } from '../db/schema/Food.ts';
import { NotFoundError } from '../errors/MyErrors.ts';

const foodService = {
  async getFood(foodId: string | Types.ObjectId) {
    const food = await Food.findById(foodId);

    if (!food) {
      throw new NotFoundError('존재하지 않는 먹이 입니다', 404);
    }

    return food;
  },
};

export default foodService;
