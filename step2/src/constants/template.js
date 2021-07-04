export const baseHtmlTemplate = () => `
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
  </ul>
</main>
`;

export const processItemsTemplate = (item) => `
<li>
  <form name="processItem" method="post" data-id="${item.id}">
    <fieldset>
      <input class="checkbox" type="checkbox" name="check" data-id="${item.id}" ${item.checked ? "checked" : null}/>
      <span ${item.checked ? `style='color: #09F'` : ""}>${item.content}</span>
      <button class="${item.checked ? "cancel" : "done"}" type="button" data-id="${item.id}">${
  item.checked ? "취소" : "완료"
}</button>
      <button class="edit" type="button" data-id="${item.id}">수정</button>
      <button class="delete" type="submit" data-id="${item.id}">삭제</button>
    </fieldset>
  </form> 
</li>`;

export const editItemTemplate = (item) => `
<li>
  <form name="updateItem" method="post" data-id="${item.id}">
    <fieldset>
      <input class="checkbox" type="checkbox" name="check" data-id="${item.id}" ${item.checked ? "checked" : null}/>
      <label>
        <input class="editInput" type="text" value="${item.content}" data-id="${item.id}"/>
      </label>
      <button class="update" type="submit" data-id="${item.id}">완료</button>
      <button class="cancel" type="button" data-id="${item.id}">취소</button>
    </fieldset>
  </form> 
</li>`;
