import './events.js';
import data from './data/index.js';
import ItemListEl from './elements/ItemListEl.js';

const $body = document.querySelector('body');
const $todoList = document.querySelector('[data-todo-list]');

const execute = () => {
  const itemListEl = new ItemListEl({
    itemList: data.items,
    $root: $todoList
  });

  itemListEl.render();
}

execute();
