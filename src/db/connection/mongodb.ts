import { connect } from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

async function connectionMongodb() {
  await connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@tamagotchi.gfftvbo.mongodb.net/?retryWrites=true&w=majority&appName=tamagotchi`,
    { dbName: 'tamagotchi' }
  );
}

export default connectionMongodb;
