import { template } from './template.js';

export const state = {
  todoItems: [],
  selectedItem: -1
};

const addItem = (e) => {
  e.preventDefault();
  const content = e.target.querySelector('input').value.trim();
  if (content.length === 0) {
    return alert('아이템 내용을 입력해주세요');
  }
  const myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');
  fetch('http://localhost:3000/api/items', {
    method: 'post',
    headers: myHeaders,
    body: JSON.stringify({ content: content })
  }).then(render());
};

const editItem = (e) => {
  state.selectedItem = Number(e.target.dataset.key);
  render();
};

const CancelItem = () => {
  state.selectedItem = -1;
  render();
};

const deleteItem = (e) => {
  e.preventDefault();
  const key = Number(e.target.dataset.key);
  console.log(key);
  fetch(`http://localhost:3000/api/items/${state.todoItems[key].idx}`, {
    method: 'delete'
  }).then(render());
};

const updateItem = (e) => {
  e.preventDefault();
  const content = e.target.querySelector('input').value.trim();
  if (content.length === 0) {
    return alert('아이템 내용을 입력해주세요');
  }
  const myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');
  fetch(
    `http://localhost:3000/api/items/edit/${state.todoItems[state.selectedItem].idx}`,
    {
      method: 'put',
      headers: myHeaders,
      body: JSON.stringify({ content: content })
    }
  )
    .then((state.selectedItem = -1))
    .then(render());
};

// esc
document.addEventListener('keydown', (e) => {
  const keyCode = e.keyCode;
  if (keyCode == 27 && state.selectedItem != -1) {
    CancelItem();
  }
});

const toggleItem = (e) => {
  e.preventDefault();
  const key = Number(e.target.dataset.key);
  const item = state.todoItems[key];
  fetch(`http://localhost:3000/api/items/toggle/${state.todoItems[key].idx}`, {
    method: 'put',
    body: JSON.stringify({ isComplete: !item.isComplete })
  }).then(render());
};

export const render = async () => {
  await fetch('http://localhost:3000/api/items')
    .then((res) => res.json())
    .then((items) => {
      console.log(items);
      state.todoItems = items;
    });
  const $app = document.querySelector('#app');
  $app.innerHTML = template();

  // 태그 등록
  const $appenderForm = $app.querySelector('.appender');
  const $modifiers = $app.querySelectorAll('.modifier');
  const $cancelers = $app.querySelectorAll('.canceler');
  const $deleter = $app.querySelectorAll('.deleter');
  const $modifierForm = $app.querySelector('form[name="modifierForm"]');
  const $complete = $app.querySelectorAll('.complete');

  /** 이벤트 등록 */
  // 아이템 추가 관리
  $appenderForm.addEventListener('submit', addItem);

  // 아이템 수정 버튼 관리
  $modifiers.forEach(($modifier) => {
    $modifier.addEventListener('click', editItem);
  });

  // 아이템 수정 취소 버튼 관리
  $cancelers.forEach(($canceler) => {
    $canceler.addEventListener('click', CancelItem);
  });

  // 아이템 수정 관리
  $modifierForm?.addEventListener('submit', updateItem);

  // 아이템 삭제 관리
  $deleter.forEach(($el) => {
    $el.addEventListener('click', deleteItem);
  });

  // 토글 관리
  $complete.forEach(($el) => {
    $el.addEventListener('click', toggleItem);
  });
};
