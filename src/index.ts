import express from 'express';
import userRouter from './routers/userRouter.ts';
import petRouter from './routers/petRouter.ts';
import cookieParser from 'cookie-parser';
import petValidator from './controllers/pet-controller/petValidator.ts';
import petError from './error/petError.ts';

const app = express();
const port = 5000;

app.use(express.json());
app.use(cookieParser());
app.use('/pets', petValidator.auth, petError.auth);

app.use('/users', userRouter);
app.use('/pets', petRouter);

app.get('/', (req, res) => {
  res.send('다마고치 홈');
});

app.listen(port, () => {
  console.log(`open sever port ${port}`);
});
