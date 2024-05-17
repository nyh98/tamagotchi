import { PoolConnection } from 'mariadb';
import SqlTemplate from '../db/template/SqlTemplate.ts';
import requestService from './RequestService.ts';
import { NotFoundError } from '../errors/MyErrors.ts';
import foodService from './FoodService.ts';

class PetService {
  private SqlTemplate;

  constructor() {
    this.SqlTemplate = new SqlTemplate();
  }

  private async setHungryLevel(hungryLevel: number, userId: number, conn?: PoolConnection) {
    return await this.SqlTemplate.modifyQuery(
      'UPDATE user_current_pet SET hungry = ? WHERE user_id = ?',
      [hungryLevel, userId],
      conn
    );
  }

  async markPetAsDead(userId: number) {
    return await this.SqlTemplate.modifyQuery('UPDATE user_current_pet SET alive = 0 WHERE user_id = ?', [userId]);
  }

  async increaseBoredLevel(increaseValue: number, userId: number) {
    await this.SqlTemplate.modifyQuery('UPDATE user_current_pet SET bored = bored - ? WHERE user_id = ?', [
      increaseValue,
      userId,
    ]);
  }

  async decreaseBoredLevel(decreaseBoredValue: number, userId: number) {
    const pet = await this.getPetFromUser(userId);
    if (pet.bored - decreaseBoredValue < 0) {
      return await this.setBoredomToZero(userId);
    } else {
      await this.updateBored(decreaseBoredValue, userId);
    }
  }

  private async decreaseHungerLevel(hungryLevel: number, userId: number, conn?: PoolConnection) {
    const pet = await this.getPetFromUser(userId, conn);
    const afterHungryLv = pet.hungry - hungryLevel;
    if (afterHungryLv < 0) return await this.setHungryLevel(0, userId, conn);
    return await this.setHungryLevel(afterHungryLv, userId, conn);
  }

  async decreaseHungerWithFood(userId: number, foodId: number) {
    await this.SqlTemplate.transaction(async conn => {
      const food = await foodService.getFood(foodId, conn);
      await petService.decreaseHungerLevel(food.satisfy_hunger_lv, userId, conn);
    });
  }

  async increaseHungerLevel(hungryLevel: number, userId: number) {
    const pet = await this.getPetFromUser(userId);
    const afterHungryLv = pet.hungry + hungryLevel;
    if (afterHungryLv >= 100) return await this.markPetAsDead(userId);
    return await this.setHungryLevel(afterHungryLv, userId);
  }

  async getRandomPet(conn?: PoolConnection) {
    const [pet] = await this.SqlTemplate.getQuery('SELECT * FROM pets ORDER BY RAND() LIMIT 1', [], conn);
    return pet;
  }

  async getPetFromUser(userId: number, conn?: PoolConnection) {
    const [pet] = await this.SqlTemplate.getQuery('SELECT * FROM user_current_pet WHERE user_id = ?', [userId], conn);
    if (!pet) throw new NotFoundError('인증에 문제가 있습니다 다시 로그인 해주세요', 401);
    return pet;
  }

  async levelUpcheck(userId: number) {
    return await this.SqlTemplate.modifyQuery(
      'UPDATE user_current_pet SET phase = phase + 1 WHERE next_lv_time < NOW() AND user_id = ?',
      [userId]
    );
  }

  async setNextLvTime(userId: number) {
    let sql;

    const userPet = await this.getPetFromUser(userId);

    switch (userPet.phase) {
      case 2:
        sql = 'UPDATE user_current_pet SET next_lv_time = NOW() + INTERVAL 30 MINUTE WHERE user_id = ?'; //30분
        break;
      case 3:
        sql = 'UPDATE user_current_pet SET next_lv_time = NOW() + INTERVAL 4 HOUR WHERE user_id = ?'; //4시간
        break;
      case 4:
        sql = 'UPDATE user_current_pet SET next_lv_time = NOW() + INTERVAL 1 DAY WHERE user_id = ?'; //하루
        break;

      default:
        sql = 'UPDATE user_current_pet SET next_lv_time = NULL WHERE user_id = ?';
    }

    return await this.SqlTemplate.modifyQuery(sql, [userId]);
  }

  private async calculateStoolCount(userId: number) {
    const hour = await requestService.calculateHoursBetweenRequests(userId);

    if (hour >= 48) return 5; //마지막 요청과 현재 요청의 시간차이가 48시간 이상이면 응가 5

    if (hour >= 24) return 4; //24시간 이상이면 4

    if (hour >= 12) return 3; //12시간 이상이면 3

    if (hour >= 6) return 2; // 동일

    if (hour >= 3) return 1; // 동일
  }

  private async updateStoolCount(userId: number, stoolCount: number, conn?: PoolConnection) {
    await this.SqlTemplate.modifyQuery(
      'UPDATE user_current_pet SET stool_count = stool_count + ? WHERE user_id = ?',
      [stoolCount, userId],
      conn
    );
  }

  async updateRequestTimeAndStoolCount(userId: number) {
    await this.SqlTemplate.transaction(async conn => {
      const stoolCount = await petService.calculateStoolCount(userId);
      if (stoolCount) {
        await petService.updateStoolCount(userId, stoolCount, conn);
      }
      await requestService.createOrUpdateTime(userId, conn);
    });
  }

  private async setBoredomToZero(userId: number) {
    await this.SqlTemplate.modifyQuery('UPDATE user_current_pet SET bored = 0 WHERE user_id = ?', [userId]);
  }

  private async updateBored(decreaseBoredValue: number, userId: number) {
    await this.SqlTemplate.modifyQuery('UPDATE user_current_pet SET bored = bored - ? WHERE user_id = ?', [
      decreaseBoredValue,
      userId,
    ]);
  }

  async updatePetStateFromLastTime(userId: number, decreaseBoredValue: number) {
    await this.SqlTemplate.transaction(async conn => {
      const stoolCount = await this.calculateStoolCount(userId);
      if (stoolCount) {
        await this.updateStoolCount(userId, stoolCount, conn);
      }
      const pet = await this.getPetFromUser(userId, conn);
      if (pet.bored - decreaseBoredValue < 0) {
        return await this.setBoredomToZero(userId);
      } else {
        await this.updateBored(decreaseBoredValue, userId);
      }

      await requestService.createOrUpdateTime(userId, conn);
    });
  }
}

const petService = new PetService();
export default petService;
