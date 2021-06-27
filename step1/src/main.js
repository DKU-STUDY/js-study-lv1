const todoList = {
  todoItems: [],
  status: {
    process: 'process',
    edit: 'edit',
  },
};

const htmlTemplate = () => `
  <main id="app">
    <h1>📃 TodoList</h1>
    <form name="addItem" method="post">
      <fieldset>
        <legend hidden>TodoList Form</legend>
        <label>
          <span hidden>아이템 추가</span>
          <input type="text" size="40" placeholder="Todo Item 내용을 입력해주세요">
        </label>
        <button type="submit">전송</button>
      </fieldset>
    </form>

    <ul>
      ${todoList.todoItems
        .map((item) => {
          if (item.status === todoList.status.process) {
            return `<li>
              <form name="processItem" method="post" data-id="${item.id}">
                <fieldset>
                  <input class="checkbox" type="checkbox" name="check" data-id="${item.id}" ${
              item.checked ? 'checked' : null
            }/>
                  <span ${item.checked ? `style='color: #09F'` : ''}>${item.content}</span>
                  <button class="${item.checked ? 'cancel' : 'done'}" type="button" data-id="${item.id}">${
              item.checked ? '취소' : '완료'
            }</button>
                  <button class="edit" type="button" data-id="${item.id}">수정</button>
                  <button class="delete" type="submit" data-id="${item.id}">삭제</button>
                </fieldset>
              </form> 
            </li>`;
          }

          if (item.status === todoList.status.edit) {
            return `<li>
              <form name="updateItem" method="post" data-id="${item.id}">
                <fieldset>
                  <input class="checkbox" type="checkbox" name="check" data-id="${item.id}" ${
              item.checked ? 'checked' : null
            }/>
                  <label>
                    <input class="editInput" type="text" value="${item.content}" data-id="${item.id}"/>
                  </label>
                  <button class="update" type="submit" data-id="${item.id}">완료</button>
                  <button class="cancel" type="button" data-id="${item.id}">취소</button>
                </fieldset>
              </form> 
            </li>`;
          }
        })
        .join('')}
    </ul>
  </main>
`;

const render = () => {
  document.querySelector('body').innerHTML = htmlTemplate();

  const $addItemForm = document.querySelector(`form[name="addItem"]`);
  const $processItemForm = document.querySelectorAll(`form[name="processItem"]`);
  const $updateItemForm = document.querySelectorAll(`form[name="updateItem"]`);
  const $doneItem = document.querySelectorAll(`.done`);
  const $editItem = document.querySelectorAll(`.edit`);
  const $cancelItem = document.querySelectorAll(`.cancel`);
  const $editInput = document.querySelectorAll(`.editInput`);
  const $checkbox = document.querySelectorAll(`.checkbox`);

  const addItem = (event) => {
    event.preventDefault();
    const content = $addItemForm.querySelector('input').value.trim();
    if (content.length === 0) {
      alert('아이템 이름을 입력해주세요.');
      return;
    }

    const newItem = {
      id: todoList.todoItems.length === 0 ? 0 : todoList.todoItems[todoList.todoItems.length - 1].id + 1,
      content,
      status: todoList.status.process,
      checked: false,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    todoList.todoItems.push(newItem);
    render();
  };
  $addItemForm.addEventListener('submit', addItem);

  const doneItem = (event) => {
    const targetId = +event.target.dataset.id;

    todoList.todoItems.filter((item) => item.id === targetId)[0].checked = true;
    render();
  };
  $doneItem.forEach((item) => item.addEventListener('click', doneItem));

  const editItem = (event) => {
    const targetId = +event.target.dataset.id;

    todoList.todoItems.filter((item) => item.id === targetId)[0].status = todoList.status.edit;
    render();
  };
  $editItem.forEach((item) => item.addEventListener('click', editItem));

  const updateItem = (event, target) => {
    event.preventDefault();
    const targetId = target !== undefined ? target : +event?.target?.dataset?.id;
    const content = Array.prototype.slice
      .call($updateItemForm)
      .filter((item) => item.dataset.id === String(targetId))[0]
      .querySelector('.editInput')
      .value.trim();

    todoList.todoItems.filter((item) => item.id === targetId)[0].status = todoList.status.process;
    todoList.todoItems.filter((item) => item.id === targetId)[0].content = content;
    render();
  };
  $updateItemForm.forEach((item) => item.addEventListener('submit', updateItem));

  const cancelItem = (event, target) => {
    const targetId = target !== undefined ? target : +event?.target?.dataset?.id;

    todoList.todoItems.filter((item) => item.id === targetId)[0].status = todoList.status.process;
    todoList.todoItems.filter((item) => item.id === targetId)[0].checked = false;
    render();
  };
  $cancelItem.forEach((item) => item.addEventListener('click', cancelItem));

  const deleteItem = (event) => {
    event.preventDefault();
    const targetId = +event.target.dataset.id;

    todoList.todoItems = todoList.todoItems.filter((item) => item.id !== targetId);
    render();
  };
  $processItemForm.forEach((item) => item.addEventListener('submit', deleteItem));

  const handleCheckBox = (event) => {
    const targetId = +event.target.dataset.id;

    const checkedStatus = todoList.todoItems.filter((item) => item.id === targetId)[0].checked;
    todoList.todoItems.filter((item) => item.id === targetId)[0].checked = !checkedStatus;
    render();
  };
  $checkbox.forEach((item) => item.addEventListener('click', handleCheckBox));

  const editInputKeyEvent = (event) => {
    if (event.key === 'Escape') {
      const targetId = +event.target.dataset.id;
      cancelItem(event, targetId);
    }
    if (event.key === 'Enter') {
      const targetId = +event.target.dataset.id;
      updateItem(event, targetId);
    }
  };
  $editInput.forEach((item) => item.addEventListener('keydown', editInputKeyEvent));
};

const main = () => {
  render();
};

main();
