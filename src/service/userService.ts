import { PoolConnection } from 'mariadb';
import TxnService from './TxnService.ts';
import SqlTemplate from '../db/template/sqlTemplate.ts';
import PetService from './petService.ts';
import FoodService from './foodService.ts';

class UserService {
  TxnService;
  SqlTemplate;

  constructor() {
    this.TxnService = new TxnService();
    this.SqlTemplate = new SqlTemplate();
  }

  async setFoodForUser(userId: number, foodId: number, conn?: PoolConnection) {
    await this.SqlTemplate.modifyQuery(
      'INSERT INTO user_foods (user_id, food_id) VALUES (? , ?)',
      [userId, foodId],
      conn
    );
  }

  async setPetForUser(userId: number, petId: number, conn?: PoolConnection) {
    await this.SqlTemplate.modifyQuery(
      'INSERT INTO user_current_pet (user_id, pet_id) VALUES (?, ?)',
      [userId, petId],
      conn
    );
  }

  async setUser(
    uid: string,
    hashPwd: string,
    nickName: string,
    conn?: PoolConnection
  ) {
    await this.SqlTemplate.modifyQuery(
      'INSERT INTO users (uid, pwd, nick_name) VALUES (?, ?, ?)',
      [uid, hashPwd, nickName],
      conn
    );
  }

  async getUser(uid: string, hashPwd: string, conn?: PoolConnection) {
    const [user] = await this.SqlTemplate.getQuery(
      'SELECT id, nick_name AS nickName FROM users WHERE uid = ? AND pwd = ?',
      [uid, hashPwd],
      conn
    );
    return user;
  }

  async joinUser(uid: string, hashPwd: string, nickName: string) {
    await this.TxnService.transaction(async conn => {
      await this.setUser(uid, hashPwd, nickName, conn);
      const user = await this.getUser(uid, hashPwd, conn);
      const pet = await new PetService().getRandomPet(conn);
      const food = await new FoodService().getFood(1, conn);
      await this.setPetForUser(user.id, pet.id, conn);
      await this.setFoodForUser(user.id, food.id, conn);
    });
  }
}

export default UserService;
