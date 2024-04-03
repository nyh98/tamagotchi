import { PoolConnection } from 'mariadb';
import sqlTemplate from '../db/connection/sqlTemplate.ts';
import txTemplate from '../db/connection/txTemplate.ts';

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
