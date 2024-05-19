import { Server as httpServer } from 'http';
import { Server, ServerOptions } from 'socket.io';
import userService from '../user/userService.ts';
import foodService from '../food/foodService.ts';
import petService from '../pet/petService.ts';

class SocketManager {
  private io;

  constructor(server: httpServer, option: Partial<ServerOptions>) {
    this.io = new Server(server, option);
    this.setupEventHandlers();
  }

  private setupEventHandlers() {
    this.io.on('connect', socket => {
      const userId = socket.handshake.query.userId;

      socket.on('eat', async (foodId: string, petId: string) => {
        if (typeof userId === 'string') {
          try {
            const food = await foodService.getFood(foodId);
            await petService.petEatFood(userId, petId, food);
            const currentPet = await userService.getPetById(userId, petId);
            this.io.emit('fresh', currentPet);
          } catch (e) {
            console.error(e);
            this.io.emit('err', { message: '에러 발생' });
          }
        }
      });

      socket.on('game', async (decreaseBoredLv: number, petId: string) => {
        if (typeof userId === 'string') {
          try {
            await petService.decreaseBoredLv(userId, petId, decreaseBoredLv);
            const currentPet = await userService.getPetById(userId, petId);
            this.io.emit('fresh', currentPet);
          } catch (e) {
            console.error(e);
            this.io.emit('err', { message: '에러 발생' });
          }
        }
      });

      socket.on('disconnect', () => {
        if (typeof userId === 'string') {
          userService.updateRequstTime(userId);
        }
      });
    });
  }
}

export default SocketManager;
