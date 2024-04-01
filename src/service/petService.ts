import sqlTemplate from '../db/connection/sqlTemplate.ts';
import utils from '../utils/utils.ts';

const petService = Object.freeze({
  getPet: async () => {
    const petNumber = utils.randomPetNumber();
    return sqlTemplate
      .getQuery('SELECT * FROM pets WHERE id = ?', petNumber)
      .then(rows => rows[0])
      .catch(e => {
        throw e;
      });
  },
});

export default petService;
