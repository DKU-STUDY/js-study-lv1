import express, { Application, Request, Response } from 'express';
import ItemsRouter from './api/items';
import config from './config/index';

const app: Application = express();

app.get('/', (req: Request, res: Response) => {
  res.send('main');
});

app.use(express.json());
app.use('/api', ItemsRouter);

app.listen(config.port, () => {
  console.log('[Express Server] Port 3000');
});

export default app;
