import { QueryOptions } from 'mariadb';
import fetchConn from './mariadb.ts';

const sqlTemplate = {
  getQuery: async (sql: string | QueryOptions, ...values: unknown[]) => {
    let conn;

    try {
      conn = await fetchConn();

      const rows = await conn.query(sql, values);

      if (!rows[0]) throw new Error('Not found');

      return rows;
    } catch (e) {
      console.log(e);
      throw e;
    } finally {
      if (conn) conn.end();
    }
  },

  modifyQuery: async (sql: string | QueryOptions, ...values: unknown[]) => {
    let conn;

    try {
      conn = await fetchConn();

      const result = await conn.query(sql, values);

      if (!result.affectedRows) throw new Error('Not found');

      return true;
    } catch (e) {
      console.log(e);
      throw e;
    } finally {
      if (conn) conn.end();
    }
  },
};

export default sqlTemplate;
