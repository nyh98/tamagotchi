import foodService from '../service/foodService.ts';
import petService from '../service/petService.ts';
import userService from '../service/userService.ts';
import fetchConn from '../db/connection/mariadb.ts';

const userTransaction = Object.freeze({
  join: async (uid: string, hashPwd: string, nickName: string) => {
    const conn = await fetchConn();

    try {
      await conn.beginTransaction();

      try {
        await userService.setUserTx(conn, uid, hashPwd, nickName);
        const [user] = await userService.getUserTx(conn, uid, hashPwd);
        const [pet] = await petService.getRandomPetTx(conn);
        const [food] = await foodService.getFoodTx(conn, 1);
        await userService.setUserPetTx(conn, user.id, pet.id);
        await userService.setUserFoodTx(conn, user.id, food.id);

        await conn.commit();
      } catch (e) {
        await conn.rollback();
        throw e;
      }
    } catch (e) {
      throw e;
    } finally {
      conn.end();
    }

    let message = { message: `${nickName} 님 회원가입 완료` };
    return message;
  },
});

export default userTransaction;

// ------------------------------------------------
// message = await userService.joinUser(uid, hashPwd, nickName);
// const user = await userService.getUser(uid, hashPwd);
// const pet = await petService.getPet();
// await userService.setUserPet(user.id, pet.id); //회원가입 시 펫 증정
// const food = await foodService.getFood(1);
// await userService.setUserfood(user.id, food.id); //기본 먹이 증정 로직

//--------
