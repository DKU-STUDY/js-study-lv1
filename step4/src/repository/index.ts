import fs from 'fs';
import { TodoItem } from '../domain/TodoItem';

class Repository<T> {
  dataFilePath: string;
  todoItems: T[] | any;

  constructor(dataFilePath: string) {
    this.dataFilePath = dataFilePath;

    this.init();
  }

  private async init() {
    if (!(await fs.existsSync(this.dataFilePath))) {
      await fs.writeFileSync(this.dataFilePath, JSON.stringify([], null, 2));
    }

    const json = await fs.readFileSync(this.dataFilePath, 'utf8');
    this.todoItems = JSON.parse(json);
  }

  public get() {
    return this.todoItems;
  }

  public async set(data: TodoItem[]) {
    await fs.writeFileSync(this.dataFilePath, JSON.stringify(data, null, 2));
    this.todoItems = data;
  }
}

export default Repository;
