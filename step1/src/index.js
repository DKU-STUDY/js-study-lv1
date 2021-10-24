import './events.js';
import data from './data/index.js';
import ItemListEl from './elements/ItemListEl.js';
import 'Static/style.css';

import TestImage from 'Static/temp.png';
import Data from 'Static/data.xml';
import Notes from 'Static/data.csv';
import toml from 'Static/data.toml';
import yaml from 'Static/data.yaml';
import json from 'Static/data.json5';


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


(function testWebpackLoader() {
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
})()



