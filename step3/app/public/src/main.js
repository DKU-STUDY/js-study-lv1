// DOM
const selectOne = (parent, element) => parent.querySelector(element);
const selectAll = (element) => document.querySelectorAll(element);
const selectParent = e => e.target.parentElement;

const $appenderForm = selectOne(document, '#appender-form');
const $appenderInput = selectOne($appenderForm, 'input')
const $todoList = selectOne(document, '#todo-list');

$appenderForm.addEventListener('submit', handleSubmitBtn);
loadFromServer();

// function
function handleSubmitBtn(e) {
  e.preventDefault();
  const content = $appenderInput.value;
  const newItem = createItem(content);
  postToServer(newItem.id, content);
  $appenderInput.value = '';
  $appenderInput.focus();
  $todoList.appendChild(newItem);
  registerEvent();
};

function createItem(content, id, checked) {
  const li = document.createElement('li');  
  li.id = id ? id : Date.now();
  li.innerHTML = `
    <input type="checkbox" class="check">
    <p>${content}</p>
    <button class="toggle">완료</button>
    <button class="edit">수정</button>
    <button class="remove">삭제</button>
  `;
  if (checked) {
    selectOne(li, '.toggle').innerText = "취소";
    selectOne(li, '.check').checked = true;  
    selectOne(li, 'p').style.textDecoration = "line-through";
    selectOne(li, 'p').style.color = "#09F";
  }
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
  const $check = $parent.querySelector('.check');
  let isChecked = $check.checked;
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
    $check.checked = toggled ? true : false;
  }
  putToServer($parent.id, $content.innerText, $check.checked);
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

  const completeEdit = e => {
    e.preventDefault();
    const newContent = $editInput.value;
    $parent.innerHTML = originHTML;
    selectOne($parent, 'p').innerText = newContent;
    selectOne($parent, '.check').checked = isChecked;
    putToServer($parent.id, newContent, isChecked);
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
  deleteServerItem($parent.id);
};

// Server
function loadFromServer() {
  fetch('api/todo').then(res => res.json()).then((data) => {
    const items = data.item;
    for (i=0; i < items.length; i++) {
      const id = items[i].id;
      const content = items[i].content;
      const checked = items[i].checked;
      $todoList.appendChild(createItem(content, id, checked));
      registerEvent();
    }
  })
};

function postToServer(id, text) {
  const reqBody = JSON.stringify({
    id: id,
    content: text,
    checked: false
  });
  fetch('/api/todo', {
    method: 'post',
    body: reqBody,
    headers: { 'content-type': 'application/json' }
  })
}

function putToServer(id, text, checked) {
  const reqBody = JSON.stringify({
    id: id,
    content: text,
    checked: checked
  });
  fetch('/api/todo/edit', {
    method: 'put',
    body: reqBody,
    headers: { 'content-type': 'application/json' }
  })
}

function deleteServerItem(id) {
  fetch('/api/todo/delete', {
    method: 'delete',
    body: JSON.stringify({
      id: id
    }),
    headers: { 'content-type': 'application/json' }
  })
}