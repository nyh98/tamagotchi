import express from 'express';
import userRouter from './routers/userRouter.ts';
import petRouter from './routers/petRouter.ts';
import cookieParser from 'cookie-parser';

const app = express();
const port = 5000;

app.use(express.json());
app.use(cookieParser());

app.use('/users', userRouter);
app.use('/pets', petRouter);

app.use((req, res) => {
  res.send('아무것도 없음'); //404페이지 만들어야됨
});
app.listen(port, () => {
  console.log(`open sever port ${port}`);
});
