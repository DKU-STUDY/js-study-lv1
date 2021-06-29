import { template } from './template.js';

export const state = {
  todoItems: [
    { id: 1, content: '첫 번째 아이템', isComplete: false, createAt: Date.now() },
    { id: 2, content: '두 번째 아이템', isComplete: true, createAt: Date.now() },
    { id: 3, content: '세 번째 아이템', isComplete: false, createAt: Date.now() }
  ],
  selectedItem: -1
};

const addItem = (e) => {
  e.preventDefault();
  const content = e.target.querySelector('input').value.trim();
  if (content.length === 0) {
    return alert('아이템 내용을 입력해주세요');
  }

  state.todoItems.push({
    id: 4,
    createAt: Date.now(),
    content: e.target.querySelector('input').value,
    isComplete: false
  });
  render();
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
  const key = Number(e.target.dataset.key);
  state.todoItems.splice(key, 1);
  render();
};

const updateItem = (e) => {
  e.preventDefault();
  const content = e.target.querySelector('input').value.trim();
  if (content.length === 0) {
    return alert('아이템 내용을 입력해주세요');
  }
  state.todoItems[state.selectedItem].content = content;
  state.selectedItem = -1;
  render();
};

// esc
(() => {
  document.addEventListener('keydown', (e) => {
    const keyCode = e.keyCode;
    if (keyCode == 27 && state.selectedItem != -1) {
      CancelItem();
    }
  });
})();

const toggleItem = (e) => {
  const key = Number(e.target.dataset.key);
  const item = state.todoItems[key];
  item.isComplete = !item.isComplete;
  render();
};

export const render = () => {
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
