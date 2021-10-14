export default class El {
  _$root;
  constructor({ $root} = {}) {
    this._$root = $root;
  }

  render() {
    throw 'override render!';
  }
}
