import El from './El.js';
import { illegalArgumentsError } from '../error.js';

export default class Observer {
  #subscribers = new Set();

  subscribe(element) {
    element instanceof El && illegalArgumentsError(element);
    this.#subscribers.add(element);
  }

  notify() {
    this.#subscribers.forEach(subscriber => subscriber.render());
  }
}
