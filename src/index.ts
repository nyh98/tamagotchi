import express from 'express';
import userRouter from './routers/userRouter.ts';
import petRouter from './routers/petRouter.ts';
import cookieParser from 'cookie-parser';
import petService from './service/PetService.ts';

const app = express();
const port = 5000;

app.use(express.json());
app.use(cookieParser());

app.use('/users', userRouter);
app.use('/pets', petRouter);

app.listen(port, () => {
  console.log(`open sever port ${port}`);
});
