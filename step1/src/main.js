const state = {
  todoItems: [
    { id: 1, content: '첫 번째 아이템', isComplete: false, createdAt: Date.now() },
    { id: 2, content: '포동이', isComplete: true, createdAt: Date.now() },
    { id: 3, content: '코코', isComplete: false, createdAt: Date.now() },
  ],
  selectedItem: -1,
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
        ${state.todoItems.map(function (item, key) {
          if (key === state.selectedItem) {
            return `
              <li>
                <form name="modifierForm" action="">
                  <fieldset>
                    <legend hidden>아이템 수정</legend>
                    <label>
                      <span hidden>아이템 수정</span>
                      <input type="text" value="${item.content}" size="40">
                    </label>
                    <button type="submit">완료</button>
                    <button type="button">취소</button>
                  </fieldset>
                </form>
              </li>
              <!-- / 수정 중인 아이템 -->
            `
          }
          return `
            <li>
              <p>${item.content}</p>
              <button type="button">취소</button>
              
              <button
                type="button"
                class="modifier"
                data-key="${key}"
              >
                수정
              </button>
              
              <button
                type="button"
                class="deleter"
                data-key="${key}"
              >
                삭제
              </button>
            </li>
          `
        }).join('')}
        <!-- / 완료된 아이템 -->
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

  // 태그 등록
  const $appenderForm = $app.querySelector('form[name="appenderForm"]');
  const $modifiers = $app.querySelectorAll('.modifier');
  const $deleter = $app.querySelectorAll('.deleter');
  const $modifierForm = $app.querySelector('form[name="modifierForm"]');

  /** 이벤트 등록 **/

  // 아이템 추가 관리
  const addItem = function (event) {
    event.preventDefault();
    const content = $appenderForm.querySelector('input').value.trim();
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
  $appenderForm.addEventListener('submit', addItem);

  // 아이템 수정 버튼 관리
  const editItem = function (event) {
    state.selectedItem = Number(event.target.dataset.key);
    render();
  }
  $modifiers.forEach(function ($modifier) {
    $modifier.addEventListener('click', editItem)
  })

  // 아이템 수정 관리
  const updateItem = function (event) {
    event.preventDefault();
    const content = event.target.querySelector('input').value.trim();
    if (content.length === 0) {
      return alert('아이템 내용을 입력해주세요');
    }
    state.todoItems[state.selectedItem].content = content;
    state.selectedItem = -1;
    render();
  }
  if ($modifierForm) {
    $modifierForm.addEventListener('submit', updateItem);
  }

  // 아이템 삭제 관리
  const deleteItem = function (event) {
    const key = Number(event.target.dataset.key);
    state.todoItems.splice(key, 1);
    render();
  }
  $deleter.forEach(function ($el) {
    $el.addEventListener('click', deleteItem)
  })

  /** 이벤트 등록 **/

}

function main () {
  render();
}

// 앱 실행
main();
