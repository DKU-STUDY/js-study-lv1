import Subscriber from './Subscriber.js';

export default class El extends Subscriber {
  _$root;
  constructor({ $root} = {}) {
    super();
    this._$root = $root;
  }
}
