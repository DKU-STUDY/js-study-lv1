import { isBlank } from '../common/StringUtils.js';
import { illegalArgumentsError } from '../error.js';
import { STATE_AND_El as STATE } from './index.js';
import Observer from '../core/Observer.js';
import El from '../core/El.js';

export default class Item {
  #id = null;
  #name = '';
  #state = STATE.NORMAL;
  #observer = new Observer();

  constructor({ name, id }) {
    Item.validate(name);
    this.#id = id;
    this.#name = name;
  }

  use(element) {
    !(element instanceof El) && illegalArgumentsError('Item');
    this.#observer.subscribe(element);
    return this;
  }

  static validate(str) {
    if (isBlank(str)) {
      illegalArgumentsError(`invalid name' ${str}`);
    }
  }

  get name() {
    return this.#name;
  }

  get id() {
    return this.#id;
  }

  /**
   * STATE 의 키 타입 이어야 한다.
   * @param state {'COMPLETE' | 'UPDATE' | 'NORMAL' | 'DELETE' | 'UPDATE_COMPLETE' | 'UPDATE_CANCEL'}
   */
  setState(state) {
    const newState = STATE[state];
    if (!newState) {
      illegalArgumentsError(state);
    }

    this.#state = newState;
    this.#observer.notify();
  }

  set name(name) {
    this.#name = name;
    this.#observer.notify();
  }

  convertToEl() {
    return new this.#state({ item: this });
  }
}
