import './events.js';
import data from './data/index.js';
import ItemListEl from './elements/ItemListEl.js';
import './style.css';
import TestImage from './temp.png';
import Data from './data.xml';
import Notes from './data.csv';
import toml from './data.toml';
import yaml from './data.yaml';
import json from './data.json5';

const $body = document.querySelector('body');
const $todoList = document.querySelector('[data-todo-list]');

const execute = () => {
  const itemListEl = new ItemListEl({
    itemList: data.items,
    $root: $todoList
  });

  itemListEl.render();
}

const testImage = new Image();
testImage.src = TestImage;
$body.appendChild(testImage);

console.log({ Data });
console.log({ Notes });
console.log(toml.title);
console.log(toml.owner.name);

console.log(yaml.title);
console.log(yaml.owner.name);

console.log(json.title);
console.log(json.owner.name);

execute();
