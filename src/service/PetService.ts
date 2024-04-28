import { PoolConnection } from 'mariadb';
import TxnTemplate from '../db/template/TxnTemplate.ts';
import SqlTemplate from '../db/template/SqlTemplate.ts';
import requestService from './RequestService.ts';
import { NotFoundError } from '../errors/MyErrors.ts';

class PetService {
  private SqlTemplate;
  private TxnTemplate;

  constructor() {
    this.SqlTemplate = new SqlTemplate();
    this.TxnTemplate = new TxnTemplate();
  }

  private async setHungryLevel(hungryLevel: number, userId: number) {
    return await this.SqlTemplate.modifyQuery('UPDATE user_current_pet SET hungry = ? WHERE user_id = ?', [
      hungryLevel,
      userId,
    ]);
  }

  async markPetAsDead(userId: number) {
    return await this.SqlTemplate.modifyQuery('UPDATE user_current_pet SET alive = 0 WHERE user_id = ?', [userId]);
  }

  async decreaseHungerLevel(hungryLevel: number, userId: number) {
    const pet = await this.getPetFromUser(userId);
    const afterHungryLv = pet.hungry - hungryLevel;
    if (afterHungryLv < 0) return await this.setHungryLevel(0, userId);
    return await this.setHungryLevel(afterHungryLv, userId);
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

  async getPetFromUser(userId: number) {
    const [pet] = await this.SqlTemplate.getQuery('SELECT * FROM user_current_pet WHERE user_id = ?', [userId]);
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

  async calculateStoolCount(userId: number) {
    const hour = await requestService.calculateHoursBetweenRequests(userId);

    if (hour >= 48) return 5; //마지막 요청과 현재 요청의 시간차이가 48시간 이상이면 응가 5

    if (hour >= 24) return 4; //24시간 이상이면 4

    if (hour >= 12) return 3; //12시간 이상이면 3

    if (hour >= 6) return 2; // 동일

    if (hour >= 3) return 1; // 동일
  }

  async updateStoolCount(userId: number, stoolCount: number) {
    await this.SqlTemplate.modifyQuery('UPDATE user_current_pet SET stool_count = stool_count + ? WHERE user_id = ?', [
      stoolCount,
      userId,
    ]);
  }
}

const petService = new PetService();
export default petService;
