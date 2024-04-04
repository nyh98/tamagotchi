import { PoolConnection } from 'mariadb';
import SqlTemplate from '../db/template/SqlTemplate.ts';
import TxnService from './TxnService.ts';

class PetService {
  SqlTemplate;
  TxnService;

  constructor() {
    this.SqlTemplate = new SqlTemplate();
    this.TxnService = new TxnService();
  }

  async getRandomPet(conn?: PoolConnection) {
    const [pet] = await this.SqlTemplate.getQuery(
      'SELECT * FROM pets ORDER BY RAND() LIMIT 1',
      [],
      conn
    );
    return pet;
  }
}

export default PetService;
