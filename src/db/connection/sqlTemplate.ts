import { QueryOptions } from 'mariadb';
import fetchConn from './mariadb.ts';

const sqlTemplate = {
  getQuery: async (sql: string | QueryOptions, ...values: unknown[]) => {
    let conn;

    try {
      conn = await fetchConn();

      const rows = await conn.query(sql, values);

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

      const rows = await conn.query(sql, values);

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
