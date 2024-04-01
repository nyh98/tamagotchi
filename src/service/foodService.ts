import sqlTemplate from '../db/connection/sqlTemplate.ts';

const foodService = Object.freeze({
  getFood: async (food_id: number) => {
    return sqlTemplate
      .getQuery('SELECT * FROM foods WHERE id = ?', food_id)
      .then(rows => rows[0])
      .catch(e => {
        throw e;
      });
  },
});

export default foodService;
