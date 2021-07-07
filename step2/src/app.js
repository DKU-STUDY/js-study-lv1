import {Item} from "./component/Item.js";

class App {
    constructor() {
        const $app = document.querySelector('#app');
        new Item($app);
    }
}

new App();