export default class Observer {
  #subscribers = new Set();

  subscribe(element) {
    this.#subscribers.add(element);
  }

  notify() {
    this.#subscribers.forEach(subscriber => subscriber.render());
  }
}
