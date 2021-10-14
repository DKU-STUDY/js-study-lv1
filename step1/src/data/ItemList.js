import Observer from '../core/Observer.js';
import Item from './Item.js';
import { uuidv4 } from '../utils/StringUtils.js';

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
    return this.#items;
  }

}
