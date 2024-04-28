import { PoolConnection } from 'mariadb';
import SqlTemplate from '../db/template/SqlTemplate.ts';
import TxnTemplate from '../db/template/TxnTemplate.ts';
import { NotFoundError } from '../errors/MyErrors.ts';

class FoodService {
  private SqlTemplate;
  private TxnTemplate;

  constructor() {
    this.SqlTemplate = new SqlTemplate();
    this.TxnTemplate = new TxnTemplate();
  }

  async getFood(foodId: number, conn?: PoolConnection) {
    const [food] = await this.SqlTemplate.getQuery('SELECT * FROM foods WHERE id = ?', [foodId], conn);
    if (!food) throw new NotFoundError('존재하지 않는 먹이 입니다', 404);
    return food;
  }
}

const foodService = new FoodService();

export default foodService;
