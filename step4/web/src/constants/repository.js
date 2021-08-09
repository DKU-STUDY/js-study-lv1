export class Repository {
  items;

  constructor() {
    this.items = [];
  }

  get() {
    return this.items;
  }

  set(items) {
    this.items = items;
  }
}
