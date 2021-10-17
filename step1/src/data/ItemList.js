import Observer from '../core/Observer.js';
import Item from './Item.js';
import { uuidv4 } from '../utils/StringUtils.js';
import { illegalArgumentsError } from '../error.js';

export default class ItemList {
  #items = {};
  #observer = new Observer();

  add(name) {
    const id = uuidv4();
    this.#items[id] = new Item({name, id});
    this.#observer.notify();
  }

  use(element) {
    this.#observer.subscribe(element);
    Object.values(this.#items).forEach(item => item.use(element));
    return this.#items;
  }

  get(id) {
    const item = this.#items[id];
    if (!item) {
      illegalArgumentsError(id);
    }
    return item;
  }

}
