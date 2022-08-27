import express, {Request, Response} from 'express';
import { authRouter } from './authRoute';
const routes = express.Router();

routes.get('/', (_req: Request, res: Response): void => {
  res.status(200).json('Main Api');
});

routes.use('/auth', authRouter);
// routes.use('/product', authenticationMiddleware, productRouter);
// routes.use('/user', userRouter);
// routes.use('/order', authenticationMiddleware, orderRouter);

export default routes;
