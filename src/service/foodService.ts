import { PoolConnection } from 'mariadb';
import SqlTemplate from '../db/template/sqlTemplate.ts';
import TxnService from './TxnService.ts';

class FoodService {
  SqlTemplate;
  TxnService;

  constructor() {
    this.SqlTemplate = new SqlTemplate();
    this.TxnService = new TxnService();
  }

  async getFood(foo_id: number, conn?: PoolConnection) {
    const [food] = await this.SqlTemplate.getQuery(
      'SELECT * FROM foods WHERE id = ?',
      [foo_id, conn]
    );
    return food;
  }
}

export default FoodService;
