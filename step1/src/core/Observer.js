import { illegalArgumentsError } from '../error.js';
import Subscriber from './Subscriber.js';

export default class Observer {
  #subscribers = new Set();

  subscribe(subscriber) {
    subscriber instanceof Subscriber && illegalArgumentsError(subscriber);
    this.#subscribers.add(subscriber);
  }

  notify() {
    this.#subscribers.forEach(subscriber => subscriber.render());
  }
}
