import { PoolConnection } from 'mariadb';
import sqlTemplate from '../db/template/sqlTemplate.ts';
import txTemplate from '../db/template/txTemplate.ts';

const foodService = Object.freeze({
  getFoodTx: async (conn: PoolConnection, food_id: number) => {
    const foods = await txTemplate.getQuery(
      conn,
      'SELECT * FROM foods WHERE id = ?',
      food_id
    );
    return foods;
  },
});

export default foodService;
