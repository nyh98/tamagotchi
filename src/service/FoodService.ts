import { PoolConnection } from 'mariadb';
import SqlTemplate from '../db/template/SqlTemplate.ts';
import TxnService from './TxnService.ts';

class FoodService {
  private SqlTemplate;
  private TxnService;

  constructor() {
    this.SqlTemplate = new SqlTemplate();
    this.TxnService = new TxnService();
  }

  async getFood(food_id: number, conn?: PoolConnection) {
    const [food] = await this.SqlTemplate.getQuery('SELECT * FROM foods WHERE id = ?', [food_id], conn);

    return food;
  }
}

export default FoodService;
