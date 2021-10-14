export default class Observer {
  #subscribers = [];

  subscribe(element) {
    this.#subscribers.push(element);
  }

  notify() {
    this.#subscribers.forEach(subscriber => subscriber.render());
  }
}
