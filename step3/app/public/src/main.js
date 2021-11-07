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
  const originContent = selectOne($parent, 'p').innerText;
  const isChecked = selectOne($parent, '.check').checked;
  $parent.innerHTML = `
  <form id=edit-form action="" method="post">
    <fieldset>
      <legend hidden>아이템 수정</legend>
      <label>
        <span hidden>아이템 수정</span>
        <input type="text" value="${originContent}">
      </label>
    <button type="submit" >완료</button>
    <button class="cancle" type="button">취소</cancle>
  </form>
  `;
  const $editForm = selectOne($parent, '#edit-form');
  const $editInput = selectOne($parent, 'input');
  console.log($editInput);

  const completeEdit = e => {
    e.preventDefault();
    const newContent = $editInput.value;
    $parent.innerHTML = originHTML;
    selectOne($parent, 'p').innerText = newContent;
    selectOne($parent, '.check').checked = isChecked;
    registerEvent();
  };
  
  const cancleEdit = e => {
    $parent.innerHTML = originHTML;
    selectOne($parent, '.check').checked = isChecked;
    registerEvent();
  };

  const pressESC = e => {
    if (e.key === "Escape") {
      $parent.innerHTML = originHTML;
      selectOne($parent, '.check').checked = isChecked;
      registerEvent();
    }
  };

  $editForm.addEventListener('submit', completeEdit);
  selectOne($parent, '.cancle').addEventListener('click', cancleEdit);
  $parent.addEventListener('keyup', pressESC);
};

function removeItem(e) {
  $parent = selectParent(e);
  $parent.remove();
};


