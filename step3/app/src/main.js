// DOM
const selectOne = (parent, element) => parent.querySelector(element);
const selectAll = (element) => document.querySelectorAll(element);
const selectParent = e => e.target.parentElement;

const $appenderForm = selectOne(document, '#appender-form');
const $appenderInput = selectOne($appenderForm, 'input')
const $todoList = selectOne(document, '#todo-list');

$appenderForm.addEventListener('submit', handleSubmitBtn);

function handleSubmitBtn(e) {
  e.preventDefault();
  const content = $appenderInput.value;
  const newItem = createItem(content);
  $appenderInput.value = '';
  $appenderInput.focus();
  $todoList.appendChild(newItem);
  registerEvent();
};

function createItem(content) {
  const li = document.createElement('li');  
  li.innerHTML = `
  <input type="checkbox" class="check">
  <p>${content}</p>
  <button class="toggle">완료</button>
  <button class="edit">수정</button>
  <button class="remove">삭제</button>
  `;
  return li;
};

function registerEvent() {
  selectAll('.check')
    .forEach(button => button.addEventListener('click', toggleItem));
  selectAll('.toggle')
    .forEach(button => button.addEventListener('click', toggleItem));
  selectAll('.edit')
    .forEach(button => button.addEventListener('click', editItem));
  selectAll('.remove')
    .forEach(button => button.addEventListener('click', removeItem));
}

function toggleItem(e) {
  const clickedType = e.target.getAttribute('type');
  const $parent = selectParent(e);
  const $content = selectOne($parent, 'p');
  let isChecked = $parent.querySelector('.check').checked;
  let toggled;
  // toggled === true면 toggle 켜짐.
  if(clickedType) {
    toggled = isChecked ? true : false;
    $content.style.textDecoration = toggled ? "line-through" : "";
    $content.style.color = toggled ? "#09F" : "";
    selectOne($parent, '.toggle').innerText = toggled ? "취소" : "완료";
  } else {
    toggled = (e.target.innerText === "완료") ? true : false;
    $content.style.textDecoration = toggled ? "line-through" : "";
    $content.style.color = toggled ? "#09F" : "";
    selectOne($parent, '.toggle').innerText = toggled ? "취소" : "완료";
    selectOne($parent, '.check').checked = toggled ? true : false;
  }
};

function editItem(e) {
  const $parent = selectParent(e);
  const originHTML = $parent.innerHTML;
  const originText = selectOne($parent, 'p').innerText;
  $parent.innerHTML = `
  <form id=edit-form action="" method="post">
    <fieldset>
      <legend hidden>아이템 수정</legend>
      <label>
        <span hidden>아이템 수정</span>
        <input type="text" value="${originText}">
      </label>
    <button type="submit" >완료</button>
    <button class="cancle">취소</cancle>
  </form>
  `;
};

function removeItem(e) {
  $parent = selectParent(e);
  $parent.remove();
};

function completeEdit(e) {console.log('complete')};
function cancleEdit(e) {
  e.preventDefault();
  const $parent = selectParent(e);
  $parent.innerHTML = originHTML;
};
