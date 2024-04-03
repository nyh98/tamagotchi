import { PoolConnection } from 'mariadb';

const txTemplate = Object.freeze({
  getQuery: async (conn: PoolConnection, sql: string, ...values: unknown[]) => {
    return conn
      .query(sql, values)
      .then(rows => {
        if (!rows[0]) throw new Error('Not Found');
        return rows;
      })
      .catch(e => {
        throw e;
      });
  },
  modifyQuery: async (
    conn: PoolConnection,
    sql: string,
    ...values: unknown[]
  ) => {
    return conn
      .batch(sql, values)
      .then(result => {
        if (!Array.isArray(result) && !result.affectedRows) {
          throw new Error('Not Found');
        }
      })
      .catch(e => {
        throw e;
      });
  },
});

export default txTemplate;
