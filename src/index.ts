import express from 'express';
import userRouter from './routers/userRouter.ts';

const app = express();
const port = 5000;

app.use(express.json());
app.use('/users', userRouter);

app.get('/', (req, res) => {
  res.send('다마고치 홈');
});

app.listen(port, () => {
  console.log(`open sever port ${port}`);
});
