import { isBlank } from '../utils/StringUtils.js';
import { illegalArgumentsError } from '../error.js';
import ItemCompleteEl from '../elements/ItemCompleteEl.js';
import ItemUpdateEl from '../elements/ItemUpdateEl.js';
import ItemNormalEl from '../elements/ItemNormalEl.js';
const STATE = {
  COMPLETE: ItemCompleteEl,
  UPDATE: ItemUpdateEl,
  NORMAL: ItemNormalEl,
};
export default class Item {
  #id = null;
  #name = '';
  #state = STATE.NORMAL;

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

  convertToEl() {
    return new this.#state({ item: this });
  }

}
