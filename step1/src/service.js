import {state} from "./state.js";
import {baseTemplate} from "./template.js";

const addItem = event => {
  event.preventDefault();
  const $app = document.querySelector('#app');
  const $appenderForm = $app.querySelector('form[name="appenderForm"]');
  const content = $appenderForm.querySelector('input').value.trim();

  if (content.length === 0) {
    return alert('아이템 내용을 입력해주세요');
  }

  state.todoItems.push({
    id: 4,
    createdAt: Date.now(),
    content: content,
    isComplete: false,
  });
  render();
}

const editItem = event => {
  state.selectedItem = Number(event.target.dataset.key);
  render();
}

const updateItem = event => {
  event.preventDefault();
  const content = event.target.querySelector('input').value.trim();
  if (content.length === 0) {
    return alert('아이템 내용을 입력해주세요');
  }
  state.todoItems[state.selectedItem].content = content;
  state.selectedItem = -1;
  render();
}

const deleteItem = event => {
  const key = Number(event.target.dataset.key);
  state.todoItems.splice(key, 1);
  render();
}

const toggleItem = event => {
  const key = Number(event.target.dataset.key);
  const item = state.todoItems[key];
  item.isComplete = !item.isComplete;
  render();
}

export function render () {

  // 렌더링 됨
  const $app = document.querySelector('#app');
  $app.innerHTML = baseTemplate();

  // 태그 등록
  $app.querySelector('form[name="appenderForm"]')
    .addEventListener('submit', addItem)

  $app.querySelectorAll('.modifier')
    .forEach(function ($modifier) {
      $modifier.addEventListener('click', editItem)
    })

  $app.querySelectorAll('.deleter')
    .forEach(function ($el) {
      $el.addEventListener('click', deleteItem)
    })

  $app.querySelector('form[name="modifierForm"]')
    ?.addEventListener('submit', updateItem);

  $app.querySelectorAll('.complete')
    .forEach(function ($el) {
      $el.addEventListener('click', toggleItem)
    })

  /** 이벤트 등록 **/

}
