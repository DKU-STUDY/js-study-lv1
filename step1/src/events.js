import data, { BUTTON } from '../src/data/index.js';
import { KEY } from './common/consts.js';
const $addItem = document.querySelector('[data-add-item]');
const $addItemInput = document.querySelector('[data-add-item] input');

const getParentElAndItemByEvent = (event, $parentSelector) => {
  const $parent = event.target.closest($parentSelector);
  const key = $parent.dataset.key;
  const item = data.items.get(key);
  return {
    $parent, item
  }
}

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

  const { $parent, item } = getParentElAndItemByEvent(event, 'li');
  handleUpdateCompleteButton(buttonType, item, $parent);
  item.setState(buttonType);
};

$todoList.addEventListener('keydown', (event) => {
  const { key } = event;
  if (event.target.dataset.updateItem !== undefined && key === KEY.ESCAPE) {
    const { item } = getParentElAndItemByEvent(event, 'li');
    item.setState(BUTTON.UPDATE_CANCEL);
  }
})

$todoList.addEventListener('click', handleButton);



