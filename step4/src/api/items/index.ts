import express, { Request, response, Response, Router } from 'express';
import { dataPath } from '../../config';
import { TodoItem } from '../../domain/TodoItem';
import Repository from '../../repository';

const ItemsRouter: Router = express.Router();
const repository = new Repository<TodoItem>(dataPath);

ItemsRouter.get('/items', (_, res: Response) => {
  res.json(repository.get());
});

ItemsRouter.post('/items', (req: Request, res: Response) => {
  const content: string | undefined = req.body?.content;
  if (content === undefined) {
    res.status(400).json({ success: false, error: 'content를 입력해주세요.' });
    return;
  }

  const todoItems: TodoItem[] = repository.get();
  const newItem: TodoItem = {
    idx: todoItems?.length !== 0 ? todoItems[todoItems.length - 1]?.idx + 1 : 0,
    content,
    completed: false,
    createdAt: new Date(),
  };
  repository.set([...todoItems, newItem]);

  res.status(200).json({ success: true });
});

ItemsRouter.put('/items/:idx', (req: Request, res: Response) => {
  const content: string | undefined = req.body?.content;
  if (content === undefined) {
    res.status(400).json({ success: false, error: 'content를 입력해주세요.' });
    return;
  }

  const todoItems: TodoItem[] = repository.get();
  const idx: number = +req?.params?.idx;
  if (isNaN(idx) || todoItems.filter((item) => item.idx === idx)?.length === 0) {
    res.status(400).json({ success: false, error: `${req.params?.idx}: 존재하지 않는 아이템입니다.` });
    return;
  }

  todoItems
    .filter((item) => item.idx === idx)
    .map((item) => {
      item.content = content;
    });
  repository.set(todoItems);

  res.status(200).json({ success: true });
});

ItemsRouter.put('/items/toggle/:idx', (req: Request, res: Response) => {
  const todoItems: TodoItem[] = repository.get();
  const idx: number = +req?.params?.idx;
  if (isNaN(idx) || todoItems.filter((item) => item.idx === idx)?.length === 0) {
    res.status(400).json({ success: false, error: `${req.params?.idx}: 존재하지 않는 아이템입니다.` });
    return;
  }

  todoItems
    .filter((item) => item.idx === idx)
    .map((item) => {
      const toggled = item.completed;
      item.completed = !toggled;
    });
  repository.set(todoItems);

  res.status(200).json({ success: true });
});

ItemsRouter.delete('/items/:idx', (req: Request, res: Response) => {
  const todoItems: TodoItem[] = repository.get();
  const idx: number = +req?.params?.idx;
  if (isNaN(idx) || todoItems.filter((item) => item.idx === idx)?.length === 0) {
    res.status(400).json({ success: false, error: `${req.params?.idx}: 존재하지 않는 아이템입니다.` });
    return;
  }

  repository.set(todoItems.filter((item) => item.idx !== idx));

  res.status(200).json({ success: true });
});

export default ItemsRouter;
