import { PoolConnection } from 'mariadb';
import txTemplate from '../db/template/txTemplate.ts';

const petService = Object.freeze({
  getRandomPetTx: async (conn: PoolConnection) => {
    const pets = await txTemplate.getQuery(
      conn,
      'SELECT * FROM pets ORDER BY RAND() LIMIT 1'
    );
    return pets;
  },
});

export default petService;
