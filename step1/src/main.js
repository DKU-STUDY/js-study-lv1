const state = {
  todoItems : [
      { id: 1, content: 'item 1', isComplete: false, createAt: Date.now() },
      { id: 2, content: 'item 2', isComplete: false, createAt: Date.now() },
      { id: 3, content: 'item 3', isComplete: false, createAt: Date.now() },
  ],
  selectedItem : -1,
}

function template() {
  return `
  <main id="app">
    <h1>📃 TodoList</h1>
    <form name="appenderForm" action="" method="post">
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
      ${state.todoItems.map(function(item,key) {
          return ` 
              <li>
                <p>${item.content}</p>
                <button type="button">취소</button>
                <button type="button">수정</button>
                <button type="button">삭제</button>
              </li>
              `
      }).join('')
    
    }
    </ul>
  </main>
  `
} 

function render() {
  const $app = document.querySelector('#app');
  $app.innerHTML = template();
}

function main () {
  render();
}

// 앱 실행
main();
