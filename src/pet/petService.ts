import { Types } from 'mongoose';
import { Pet } from '../db/schema/Pet.ts';
import userService from '../user/userService.ts';
import User, { IUser } from '../db/schema/User.ts';
import { IFood } from '../db/schema/Food.ts';

const petService = {
  async getRandomPet(userId: string) {
    const [pet] = await Pet.aggregate<typeof Pet>([{ $sample: { size: 1 } }]).limit(1);
    return pet;
  },

  calculateStoolCount(lastTime: number) {
    const hour = Math.floor((Date.now() - lastTime) / (1000 * 60 * 60));

    if (hour >= 48) return 5; //마지막 요청과 현재 요청의 시간차이가 48시간 이상이면 응가 5

    if (hour >= 24) return 4; //24시간 이상이면 4

    if (hour >= 12) return 3; //12시간 이상이면 3

    if (hour >= 6) return 2; // 동일

    if (hour >= 3) return 1; // 동일
  },

  async checkIfPetIsDead(userId: string | Types.ObjectId) {
    await User.updateOne(
      { _id: userId },
      { $set: { 'pets.$[pet].isAlive': false } },
      { arrayFilters: [{ $or: [{ 'pet.stoolCount': { $gte: 5 } }, { 'pet.hungry': { $gte: 100 } }] }] }
    );
  },

  calculateNextLvTime(phase: number) {
    switch (phase) {
      case 2:
        return new Date(Date.now() + 1000 * 60 * 30); //30분
      case 3:
        return new Date(Date.now() + 1000 * 60 * 60 * 4); //4시간
      case 4:
        return new Date(Date.now() + 1000 * 60 * 60 * 24); //하루
      default:
        return null;
    }
  },

  async checkLvUp(userId: string | Types.ObjectId) {
    const user = await userService.getUser(userId);
    user.pets = user.pets.map(pet => {
      if (pet.nextLvTime && pet.nextLvTime < new Date()) {
        pet.phase += 1;
        pet.nextLvTime = this.calculateNextLvTime(pet.phase);
      }
      return pet;
    });
    await user.save();
  },

  async petEatFood(userId: string | Types.ObjectId, petId: string | Types.ObjectId, food: IFood) {
    const user = await userService.getUser(userId);
    user.pets = user.pets.map(pet => {
      if (pet._id.equals(petId)) {
        if (pet.hungry - food.decreaseHungerLv < 0) {
          pet.hungry = 0;
        } else {
          pet.hungry -= food.decreaseHungerLv;
        }
      }
      return pet;
    });
    await user.save();
  },

  async decreaseBoredLv(userId: string | Types.ObjectId, petId: string | Types.ObjectId, decreaseLv: number) {
    const user = await userService.getUser(userId);
    user.pets = user.pets.map(pet => {
      if (pet._id.equals(petId)) {
        if (pet.bored - decreaseLv < 0) {
          pet.bored = 0;
        } else {
          pet.bored -= decreaseLv;
        }
      }
      return pet;
    });
    await user.save();
  },
};

export default petService;
