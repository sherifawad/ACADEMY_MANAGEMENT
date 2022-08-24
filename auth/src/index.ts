import express, {Express} from 'express';
import dotenv from 'dotenv';
import routes from './routes';

/** Server */
const PORT: number | string = process.env.PORT ?? 7010;

// initialize express
const app: Express = express();
dotenv.config();
app.use(express.json())
app.use('/api', routes);
// server listen
app.listen(PORT, () => console.log(`Server started at http://localhost:${PORT}`));
