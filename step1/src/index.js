import applyAllEvents from './events.js';
import data from './data/index.js';
import ItemListEl from './elements/ItemListEl.js';
import 'Static/style.css';
import Print from './print';

const $body = document.querySelector('body');

const execute = () => {
  $body.innerHTML = `
    <main id="app">
    <h1>📃 TodoList</h1>
    <form name="appenderForm"
          action=""
          method="post"
          data-add-item
    >
      <fieldset>
        <legend hidden>TodoList Form</legend>
        <label>
          <span hidden>아이템 추가</span>
          <input
            type="text"
            size="40"
            placeholder="Todo Item 내용을 입력해주세요"
          >
        </label>
        <button type="submit">전송</button>
      </fieldset>
    </form>
    <ul data-todo-list/>
  </main>`;
  const $todoList = document.querySelector('[data-todo-list]');

  const itemListEl = new ItemListEl({
    itemList: data.items,
    $root: $todoList
  });

  itemListEl.render();
  applyAllEvents();
}
execute();

(async function testMultiBundle() {
  const btn = document.createElement('button');
  btn.innerHTML = 'Click me and check the console!';
  btn.onclick = Print.bind(null, 'Hello webpack!');
  $body.appendChild(btn);
})();

if (module.hot) {
   module.hot.accept('./print.js', function() {
     console.log('Accepting the updated printMe module!');
     printMe();
   })
}
