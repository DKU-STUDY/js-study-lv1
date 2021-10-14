import data from '../src/data/index.js';

const $addItem = document.querySelector('[data-add-item]');
const $addItemInput = document.querySelector('[data-add-item] input');

$addItem.addEventListener('submit', (event) => {
  event.preventDefault()
  const { value } = $addItemInput;
  try {
    data.items.add(value);
    alert('아이템을 추가하였습니다.');
    $addItemInput.value = '';
  } catch(e) {
    console.dir(e);
    alert('아이템 이름을 입력해주세요.');
  }
})




