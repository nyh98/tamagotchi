import { PoolConnection } from 'mariadb';
import TxnService from './TxnService.ts';
import SqlTemplate from '../db/template/SqlTemplate.ts';

class PetService {
  private SqlTemplate;
  private TxnService;

  constructor() {
    this.SqlTemplate = new SqlTemplate();
    this.TxnService = new TxnService();
  }

  async getRandomPet(conn?: PoolConnection) {
    const [pet] = await this.SqlTemplate.getQuery('SELECT * FROM pets ORDER BY RAND() LIMIT 1', [], conn);
    return pet;
  }

  async getPetFromUser(userId: number) {
    return await this.SqlTemplate.getQuery('SELECT * FROM user_current_pet WHERE user_id = ?', [userId]);
  }

  async levelUpcheck(userId: number) {
    return await this.SqlTemplate.modifyQuery(
      'UPDATE user_current_pet SET phase = phase + 1 WHERE next_lv_time < NOW() AND user_id = ?',
      [userId]
    );
  }

  async setNextLvTime(userId: number) {
    let sql;

    const [userPet] = await this.getPetFromUser(userId);

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

    await this.SqlTemplate.modifyQuery(sql, [userId]);
  }
}

export default PetService;