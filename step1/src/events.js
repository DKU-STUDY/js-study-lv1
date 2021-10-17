import data, { BUTTON } from '../src/data/index.js';
const $addItem = document.querySelector('[data-add-item]');
const $addItemInput = document.querySelector('[data-add-item] input');
const handleAddItem = (event) => {
  event.preventDefault()
  const { value } = $addItemInput;
  try {
    data.items.add(value);
    alert('아이템을 추가하였습니다.');
    $addItemInput.value = '';
  } catch(e) {
    alert('아이템 이름을 입력해주세요.');
    console.dir(e);
  }
};
$addItem.addEventListener('submit', handleAddItem);

const $todoList = document.querySelector('[data-todo-list]');
const handleUpdateCompleteButton = (buttonType, item, $parent) => {
  if (buttonType === BUTTON.UPDATE_COMPLETE) {
    item.setName($parent.querySelector('[data-update-item]').value);
  }
}
const handleButton = (event) => {
  event.preventDefault();
  const buttonType = event.target.dataset.button;
  if (!buttonType) {
    return;
  }

  const $parent = event.target.closest('li');
  const key = $parent.dataset.key;
  const item = data.items.get(key);

  handleUpdateCompleteButton(buttonType, item, $parent);

  item.setState(buttonType);
};

$todoList.addEventListener('click', handleButton);



