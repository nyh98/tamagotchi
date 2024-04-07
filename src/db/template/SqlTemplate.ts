import { PoolConnection, QueryOptions } from 'mariadb';
import fetchConn from '../connection/mariadb.ts';

class SqlTemplate {
  /**트랜젝션 진행시 conn 필수 */
  async getQuery(sql: string | QueryOptions, values: unknown[], conn?: PoolConnection) {
    let connection;

    try {
      connection = conn ?? (await fetchConn());
      const rows = await connection.query(sql, values);

      if (!rows[0]) throw new Error('Not found');

      return rows;
    } catch (e) {
      throw e;
    } finally {
      if (!conn && connection) connection.end();
    }
  }

  /**트랜젝션 진행시 conn 필수 */
  async modifyQuery(sql: string | QueryOptions, values: unknown[], conn?: PoolConnection) {
    let connection;

    try {
      connection = conn ?? (await fetchConn());

      const result = await connection.query(sql, values);

      if (result.affectedRows) return true;

      return false;
    } catch (e) {
      console.log(e);
      throw e;
    } finally {
      if (!conn && connection) connection.end();
    }
  }
}

export default SqlTemplate;
