import express from 'express';
import userRouter from './routers/userRouter.ts';
import petRouter from './routers/petRouter.ts';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import connectionMongodb from './db/connection/mongodb.ts';

const app = express();
const port = 5000;

app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: ['http://localhost:5173'], credentials: true }));

app.use('/users', userRouter);
app.use('/pets', petRouter);
app.get('/', (req, res) => {
  res.send('웹팩으로 빌드된 파일');
});

app.listen(port, () => {
  connectionMongodb()
    .then(() => {
      console.log('db 연결 성공');
      console.log(`open sever port ${port}`);
    })
    .catch(e => console.log(e));
});
