import { isBlank } from '../utils/StringUtils.js';
import { illegalArgumentsError } from '../error.js';
import Observer from '../core/Observer.js';
import { STATE } from './index.js';
export default class Item {
  #id = null;
  #name = '';
  #state = STATE.NORMAL;

  #observer = new Observer();
  use(element) {
    this.#observer.subscribe(element);
    return this;
  }

  constructor({ name, id }) {
    this.validate(name);
    this.#id = id;
    this.#name = name;
  }

  validate(str) {
    if (isBlank(str)) {
      illegalArgumentsError('invalid name' + str);
    }
  }

  getName() {
    return this.#name;
  }

  getId() {
    return this.#id;
  }

  /**
   * STATE 의 키 타입 이어야 한다.
   * @param state
   */
  setState(state) {
    const newState = STATE[state];
    if (!newState) {
      illegalArgumentsError(state);
    }

    this.#state = newState;
    this.notify();
  }

  setName(name) {
    this.#name = name;
    this.notify();
  }

  notify() {
    this.#observer.notify();
  }

  convertToEl() {
    return new this.#state({ item: this });
  }
}
