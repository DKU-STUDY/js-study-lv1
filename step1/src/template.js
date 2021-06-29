import { state } from './service.js';
import { item } from './components/item.js';

export function template() {
  return /*html*/ `
    <main id="app">
      <h1>📃 TodoList</h1>
      <form name="appenderForm" class="appender" action="">
        <fieldset>
          <legend hidden>TodoList Form</legend>
          <label>
            <span hidden>아이템 추가</span>
            <input type="text" size="40" placeholder="Todo Item 내용을 입력해주세요">
          </label>
          <button type="submit">전송</button>
        </fieldset>
      </form>
      <ul>
        ${state.todoItems.map(item).join('')}
      </ul>
    </main>
    `;
}
