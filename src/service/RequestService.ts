import { PoolConnection } from 'mariadb';
import SqlTemplate from '../db/template/SqlTemplate.ts';
import { NotFoundError } from '../errors/MyErrors.ts';

class RequestService {
  private sqlTemplate;

  constructor() {
    this.sqlTemplate = new SqlTemplate();
  }

  private async updateRequestTime(userId: number) {
    const changed = await this.sqlTemplate.modifyQuery('UPDATE last_requests SET time = now() WHERE user_id = ?', [
      userId,
    ]);
    return changed;
  }

  async createRequestTime(userId: number, conn?: PoolConnection) {
    await this.sqlTemplate.modifyQuery('INSERT INTO last_requests (user_id) VALUES (?)', [userId], conn);
  }

  async createOrUpdateTime(userId: number) {
    const isChange = await this.updateRequestTime(userId);

    if (!isChange) {
      await this.createRequestTime(userId);
    }
  }

  private async getLastRequestTime(userId: number) {
    const [data] = await this.sqlTemplate.getQuery('SELECT time FROM last_requests WHERE user_id = ?', [userId]);
    if (!data) throw new NotFoundError('인증에 문제가 있습니다 다시 로그인 해주세요', 401);
    const lastRequestTime = new Date(data.time);
    return lastRequestTime;
  }

  private async getNowTime() {
    const [data] = await this.sqlTemplate.getQuery('SELECT now() AS currentTime');
    const currentTime = new Date(data.currentTime);
    return currentTime;
  }

  async calculateHoursBetweenRequests(userId: number) {
    const now = await this.getNowTime();
    const lastTime = await this.getLastRequestTime(userId);
    const hour = Math.floor((now.getTime() - lastTime.getTime()) / (1000 * 60 * 60));
    return hour;
  }
}

const requestService = new RequestService();
export default requestService;
