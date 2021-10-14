import ItemList from '../data/ItemList.js';
import { invalidTypeError } from '../error.js';
import ItemUpdateEl from './ItemUpdateEl.js';
import ItemCompleteEl from './ItemCompleteEl.js';
import El from '../core/El.js';

export default class ItemListEl extends El {
  #itemList;
  constructor({ itemList, $root }) {
    super({ $root });
    if (!(itemList instanceof ItemList)) {
      invalidTypeError('itemList')
    }
    this.#itemList = itemList;
    this.render();
  }

  render() {
    this._$root.innerHTML = Object.entries(this.#itemList.use(this)).map(([key ,item]) => `<li>
      ${item.convertToEl().render()}
      </li>`).join('');
  }

}
