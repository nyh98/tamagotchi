import { PoolConnection } from 'mariadb';
import SqlTemplate from '../db/template/SqlTemplate.ts';
import TxnTemplate from '../db/template/TxnTemplate.ts';

class FoodService {
  private SqlTemplate;
  private TxnTemplate;

  constructor() {
    this.SqlTemplate = new SqlTemplate();
    this.TxnTemplate = new TxnTemplate();
  }

  async getFood(foodId: number, conn?: PoolConnection) {
    const [food] = await this.SqlTemplate.getQuery('SELECT * FROM foods WHERE id = ?', [foodId], conn);

    return food;
  }
}

const foodService = new FoodService();

export default foodService;
