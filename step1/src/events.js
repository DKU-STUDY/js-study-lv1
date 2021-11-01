import data from '../src/data/index.js';
import { BUTTON, KEY } from './common/consts.js';

export default function applyAllEvents() {

  const $addItem = document.querySelector('[data-add-item]');
  const $addItemInput = document.querySelector('[data-add-item] input');
  const $todoList = document.querySelector('[data-todo-list]');

  const getParentElAndItemByEvent = (event, $parentSelector) => {
    const $parent = event.target.closest($parentSelector);
    const key = $parent.dataset.key;
    const item = data.items.get(key);
    return {
      $parent, item,
    };
  };

  const handleAddItem = (event) => {
    event.preventDefault();
    const { value } = $addItemInput;
    try {
      data.items.add(value);
      alert('아이템을 추가하였습니다.');
      $addItemInput.value = '';
    } catch (e) {
      alert('아이템 이름을 입력해주세요.');
      console.dir(e);
    }
  };

  const handleUpdateCompleteButton = (buttonType, item, $parent) => {
    return (buttonType === BUTTON.UPDATE_COMPLETE) &&
      (item.name = $parent.querySelector('[data-update-item]').value);
  };

  const handleDeleteButton = (buttonType, item) => {
    return (buttonType === BUTTON.DELETE) &&
      data.items.delete(item);
  };

  const handleButton = (event) => {
    event.preventDefault();
    const buttonType = event.target.dataset.button;
    if (!buttonType) {
      return;
    }

    const { $parent, item } = getParentElAndItemByEvent(event, 'li');
    handleUpdateCompleteButton(buttonType, item, $parent);
    if (handleDeleteButton(buttonType, item)) {
      return;
    }

    item.setState(buttonType);
  };

  const handleUpdateEscape = (event) => {
    const { key } = event;
    if (event.target.dataset.updateItem !== undefined && key === KEY.ESCAPE) {
      const { item } = getParentElAndItemByEvent(event, 'li');
      item.setState(BUTTON.UPDATE_CANCEL);
    }
  };

  $addItem.addEventListener('submit', handleAddItem);
  $todoList.addEventListener('keydown', handleUpdateEscape);
  $todoList.addEventListener('click', handleButton);
}



