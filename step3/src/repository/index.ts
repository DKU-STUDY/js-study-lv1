import fs from 'fs';
import { TodoItem } from '../domain/TodoItem';

class Repository {
  dataFilePath: string;
  todoItems: TodoItem[] | any;

  constructor() {
    this.dataFilePath = 'src/data/TodoList.json';
    if (!fs.existsSync(this.dataFilePath)) {
      fs.writeFile(this.dataFilePath, JSON.stringify([], null, 2), (err) => {
        if (err) {
          console.log('[Write File Error]');
        }
      });
    }

    fs.readFile(this.dataFilePath, 'utf8', (err, json) => {
      if (err) {
        console.log('[Read File Error]');
        return;
      }
      this.todoItems = JSON.parse(json);
    });
  }

  public get() {
    return this.todoItems;
  }

  public set(data: TodoItem[]) {
    fs.writeFile(this.dataFilePath, JSON.stringify(data, null, 2), (err) => {
      if (err) {
        console.log('[Write File Error]');
      }
      this.todoItems = data;
    });
  }
}

export default Repository;
