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
app.get('/', (req, res) => {
  res.send('웹팩으로 빌드된 파일');
});

app.listen(port, () => {
  console.log(`open sever port ${port}`);
});
