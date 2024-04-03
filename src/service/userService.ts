import { PoolConnection } from 'mariadb';
import txTemplate from '../db/connection/txTemplate.ts';

const userService = Object.freeze({
  setUserFoodTx: async (
    conn: PoolConnection,
    user_id: number,
    food_id: number
  ) => {
    await txTemplate.modifyQuery(
      conn,
      'INSERT INTO user_foods (user_id, food_id) VALUES (? , ?)',
      user_id,
      food_id
    );
  },

  setUserPetTx: async (
    conn: PoolConnection,
    user_id: number,
    pet_id: number
  ) => {
    await txTemplate.modifyQuery(
      conn,
      'INSERT INTO user_current_pet (user_id, pet_id) VALUES (?, ?)',
      user_id,
      pet_id
    );
  },

  joinTx: async (
    conn: PoolConnection,
    uid: string,
    hashPwd: string,
    nickName: string
  ) => {
    await txTemplate.modifyQuery(
      conn,
      'INSERT INTO users (uid, pwd, nick_name) VALUES (?, ?, ?)',
      uid,
      hashPwd,
      nickName
    );
  },

  getUserTx: async (conn: PoolConnection, uid: string, hashPwd: string) => {
    const users = await txTemplate.getQuery(
      conn,
      'SELECT id, nick_name FROM users WHERE uid = ? AND pwd = ?',
      uid,
      hashPwd
    ); //저장된 유저 데이터 get 쿼리(user의 고유id값 추출을 위함)
    return users;
  },
});

export default userService;
