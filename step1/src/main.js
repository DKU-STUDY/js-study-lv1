const state = {
  todoItems: [
    { id: 1, content: '첫 번째 아이템', isComplete: false, createdAt: Date.now() },
    { id: 2, content: '포동이', isComplete: true, createdAt: Date.now() },
    { id: 3, content: '코코', isComplete: false, createdAt: Date.now() },
  ],
}

function template () {
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
        
        <!-- 완료된 아이템 -->
        ${state.todoItems.map(function (item) {
          return `
            <li>
              <p>${item.content}</p>
              <button type="button">취소</button>
              <button type="button">수정</button>
              <button type="button">삭제</button>
            </li>
          `
        }).join('')}
        <!-- / 완료된 아이템 -->
  
        <!-- 수정 중인 아이템 -->
        <li>
          <form name="modifierForm" action="">
            <fieldset>
              <legend hidden>아이템 수정</legend>
              <label>
                <span hidden>아이템 수정</span>
                <input type="text" value="2주차: Webpack + TodoList 리팩토링" size="40">
              </label>
              <button type="submit">완료</button>
              <button type="button">취소</button>
            </fieldset>
          </form>
        </li>
        <!-- / 수정 중인 아이템 -->
      </ul>
    </main>
  `
}

/**
 * 앱 시작시 실행될 entry 함수
 */
function render () {
  // 렌더링 됨
  const $app = document.querySelector('#app');
  $app.innerHTML = template();

  // 이벤트 등록
  const $form = $app.querySelector('form[name="appenderForm"]');
  const itemAdd = function (event) {
    event.preventDefault();
    const content = $form.querySelector('input').value.trim();
    if (content.length === 0) {
      return alert('아이템 내용을 입력해주세요');
    }

    state.todoItems.push({
      id: 4,
      createdAt: Date.now(),
      content: content,
      isComplete: false,
    });
    render();
  }
  $form.addEventListener('submit', itemAdd);
}

function main () {
  render();
}

// 앱 실행
main();
