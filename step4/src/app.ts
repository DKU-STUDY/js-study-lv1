import express, { Application, Response } from 'express';
import path from 'path';
import ItemsRouter from './api/items';
import config from './config/index';

const app: Application = express();
const __dirname: string = path.resolve();

app.get('/', (_, res: Response) => {
  res.sendFile(path.join(__dirname, '/index.html'));
});

app.use(express.json());
app.use('/api', ItemsRouter);
app.use('/web/dist', express.static(path.join(__dirname, 'web/dist')));

app.listen(config.port, () => {
  console.log('[Express Server] Port 3000');
});

export default app;
