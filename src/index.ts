import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import connectionMongodb from './db/connection/mongodb.ts';
import userRouter from './user/userRouter.ts';
import petRouter from './pet/petRouter.ts';

const app = express();
const port = 5000;

app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.use('/auth', userRouter);
app.use('/pets', petRouter);

app.listen(port, () => {
  connectionMongodb()
    .then(() => {
      console.log('db 연결 성공');
      console.log(`open sever port ${port}`);
    })
    .catch(e => console.log(e));
});
