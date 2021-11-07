const $appenderForm = document.querySelector('#appenderForm');
const $todoList = document.querySelector('#todoList');

$appenderForm.addEventListener('submit', handleSubmitButton);

loadFromServer();

// Load saved items
function loadFromServer() {
  fetch('/api/todo').then(res => res.json()).then((data) => {
    for (i=0; i<data.length; i++) {
      const id = data[i].id;
      const content = data[i].content;
      const checked = data[i].checked;
      checked ? createCompletedItem(id, content) : createItem(id, content);
    };
  });
};

function handleSubmitButton(event) {
  event.preventDefault();
  const $appenderInput = $appenderForm.querySelector('input');
  const content = $appenderInput.value;
  const id = Date.now();
  
  createItem(id, content);
  $appenderInput.value = "";
  $appenderInput.focus();

  postToServer(id, content);
};

function registerEvent(li) {
  li.querySelector('.check').addEventListener('click', toggleItem);
  li.querySelector('.toggle').addEventListener('click', toggleItem);
  li.querySelector('.edit').addEventListener('click', editItem);
  li.querySelector('.remove').addEventListener('click', removeItem);
};

// Send registered item to server
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
  });
};

function putToServer (id, isChecked) {
  const reqBody = JSON.stringify({
    id: id,
    checked: isChecked
  });
  fetch('/api/todo/toggle', {
    method: 'put',
    body: reqBody,
    headers: { 'content-type': 'application/json' }
  });
};

function createCompletedItem (id, content) {
  const $newItem = document.createElement('li');
  $newItem.id = id;
  $newItem.innerHTML = `
    <input class="check" checked=true type="checkbox">
    <p>${content}</p>
    <button class="toggle">취소</button>
    <button class="edit">수정</button>
    <button class="remove">삭제</button>
    `;

  const $content = $newItem.querySelector('p');
  $content.style.textDecorationLine = "line-through";
  $content.style.color = "#09F";
  registerEvent($newItem);
  $todoList.appendChild($newItem);
};

function createItem (id, content) {
  const $newItem = document.createElement('li');
  $newItem.id = id;
  $newItem.innerHTML = `
    <input class="check" type="checkbox">
    <p>${content}</p>
    <button class="toggle">완료</button>
    <button class="edit">수정</button>
    <button class="remove">삭제</button>
    `;
  registerEvent($newItem);
  $todoList.appendChild($newItem);
};

function toggleItem(event) {

  event.preventDefault();

  const $parent = event.target.parentElement;
  const $content = $parent.querySelector('p');
  const $checkbox = $parent.querySelector('.check');
  const $complete = $parent.querySelector('.toggle');
  const className = event.target.getAttribute('class');
  const id = $parent.id;
  let toggled;
  let isChecked;

  // (toggled === true) => toggle 켜짐
  if (className === "check") {
    toggled = $checkbox.checked;
    $complete.innerText = toggled ? '취소' : '완료';
    $content.style.textDecorationLine = toggled ? "line-through" : "none";
    $content.style.color = toggled ? "#09F" : "";

    isChecked = toggled;
    putToServer(id, isChecked);
  } else if (className === "toggle") {
    toggled = ($complete.innerText === "완료") ? true : false;
    $checkbox.checked = toggled ? true : false;
    $content.style.textDecorationLine = toggled ? "line-through" : "none";
    $content.style.color = toggled ? "#09F" : "";
    $complete.innerText = toggled ? "취소" : "완료";

    isChecked = $checkbox.checked;
    putToServer(id, isChecked);
  }
}

function editItem(event) {

  event.preventDefault();

  const $parent = event.target.parentElement;
  const originHTML = $parent.innerHTML;
  const originText = $parent.querySelector("p").innerText;
  const isChecked = $parent.querySelector('.check').checked;
  const id = $parent.id;

  $parent.innerHTML = `<form id=editForm action="" method="post">
  <fieldset>
    <legend hidden>아이템 수정</legend>
    <label>
    <span hidden>아이템 수정</span>
    <input type="text" value="${originText}">
    </label>
  <button type="submit">완료</button>
  <button class="cancle">취소</cancle>
  </form>
  `;
  
  const $editForm = $parent.querySelector("#editForm");
  const $cancleButton = $parent.querySelector('.cancle');

  $editForm.addEventListener('submit', completeEdit);
  $cancleButton.addEventListener('click', cancleEdit);

  function completeEdit(event) {
    event.preventDefault();
    const newText = $parent.querySelector('input').value;

    $parent.innerHTML = originHTML;
    $parent.querySelector('p').innerText = newText;
    
    const reqBody = JSON.stringify({
      id: id,
      content: newText,
      checked: isChecked
    });
    fetch('/api/todo/edit', {
      method: "put",
      body: reqBody,
      headers: { 'content-type': 'application/json' }
    });

    $parent.querySelector('.check').checked = isChecked;
    registerEvent($parent);
  };

  function cancleEdit(event) {  
    event.preventDefault();
    $parent.innerHTML = originHTML;
    $parent.querySelector('.check').checked = isChecked;
    registerEvent($parent);
  };
};

function removeItem(event) {

  event.preventDefault();

  const $parent = event.target.parentElement;
  $parent.remove();

  const id = $parent.id;
  fetch('/api/todo/delete', {
    method: 'delete',
    body: JSON.stringify({ id: id }),
    headers: { 'content-type': 'application/json' }
  })
}