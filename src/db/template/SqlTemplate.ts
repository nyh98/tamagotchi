import { PoolConnection, QueryOptions, SqlError } from 'mariadb';
import fetchConn from '../connection/mariadb.ts';

class SqlTemplate {
  /**트랜젝션 진행시 conn 필수 */
  async getQuery(sql: string | QueryOptions, values?: unknown[], conn?: PoolConnection) {
    let connection;

    try {
      connection = conn ?? (await fetchConn());
      const rows = await connection.query(sql, values);

      return rows;
    } catch (e) {
      console.error(e);
      throw e;
    } finally {
      if (!conn && connection) connection.end();
    }
  }

  /**트랜젝션 진행시 conn 필수 */
  async modifyQuery(sql: string | QueryOptions, values?: unknown[], conn?: PoolConnection) {
    let connection;

    try {
      connection = conn ?? (await fetchConn());

      const result = await connection.query(sql, values);

      if (result.affectedRows) return true;

      return false;
    } catch (e) {
      console.error(e);
      throw e;
    } finally {
      if (!conn && connection) connection.end();
    }
  }
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

export default SqlTemplate;
