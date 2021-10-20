import { overrideSuperClassError } from '../error.js';

export default class El {
  _$root;
  constructor({ $root} = {}) {
    this._$root = $root;
  }

  render() {
    overrideSuperClassError('El');
  }
}
