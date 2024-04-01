import sqlTemplate from '../db/connection/sqlTemplate.ts';

const userService = Object.freeze({
  joinUser: async (uid: string, hashPwd: string, nickName: string) => {
    return sqlTemplate
      .modifyQuery(
        'INSERT INTO users (uid, pwd, nick_name) VALUES (?, ?, ?)',
        uid,
        hashPwd,
        nickName
      )
      .then(() => {
        return { message: `${nickName} 님 회원가입 완료` };
      })
      .catch(e => {
        throw e;
      });
  },
  getUser: async (uid: string, hashPwd: string) => {
    return sqlTemplate
      .getQuery(
        'SELECT id, nick_name FROM users WHERE uid = ? AND pwd = ?',
        uid,
        hashPwd
      )
      .then(rows => rows[0])
      .catch(e => {
        throw e;
      });
  },
  setUserPet: async (user_id: number, pet_id: number) => {
    return sqlTemplate
      .modifyQuery(
        'INSERT INTO user_current_pet (user_id, pet_id) VALUES (?, ?)',
        user_id,
        pet_id
      )
      .catch(e => {
        throw e;
      });
  },
  setUserfood: async (user_id: number, food_id: number) => {
    return sqlTemplate
      .modifyQuery(
        'INSERT INTO user_foods (user_id, food_id) VALUES (? , ?)',
        user_id,
        food_id
      )
      .catch(e => {
        throw e;
      });
  },
});

export default userService;

//유저 예시
// const user = {
//   id: 'testA2fsxx2',
//   nickName: 'test',
//   currentPet: {
//     name: '슬라임',
//     Phase: 1,
//     hungry: 2,
//     bored: 0,
//     nextLevel: '2024-03-30 20:00:00',
//   }
//   petCatalog: [{ name: '도마뱀' } /**..... */]
// };
