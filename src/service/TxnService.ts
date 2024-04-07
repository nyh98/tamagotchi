import { PoolConnection } from 'mariadb';
import fetchConn from '../db/connection/mariadb.ts';

class TxnService {
  async transaction<T>(context: (conn: PoolConnection) => Promise<T>) {
    let connection;

    try {
      connection = await fetchConn();
      await connection.beginTransaction();

      try {
        await context(connection);

        await connection.commit();
      } catch (e) {
        await connection.rollback();
        throw e;
      }
    } catch (e) {
      throw e;
    } finally {
      if (connection) connection.end();
    }
  }
}

export default TxnService;
