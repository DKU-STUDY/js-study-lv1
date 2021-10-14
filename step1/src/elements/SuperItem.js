import Item from '../data/Item.js';
import { invalidTypeError } from '../error.js';
import El from '../core/El.js';

export default class SuperItem extends El {
  _item = "";
  constructor({ item }) {
    super();
    if (!(item instanceof Item)) {
      invalidTypeError('item')
    }

    this._item = item;
  }

}
