const state = {
  todoItems: [
    { id: 1, content: '첫 번째 아이템', isComplete: false, createAt: Date.now() },
    { id: 2, content: '두 번째 아이템', isComplete: true, createAt: Date.now() },
    { id: 3, content: '세 번째 아이템', isComplete: false, createAt: Date.now() }
  ],
  selectedItem: -1
};

const template = () => {
  return /*html*/ `
  <main id="app">
    <h1>📃 TodoList</h1>
    <form name="appenderForm" action="">
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
      ${state.todoItems
        .map((item, key) => {
          if (key === state.selectedItem) {
            return /*html*/ `
            <!-- 수정 중인 아이템 -->
            <li>
              <form name="modifierForm" action="">
                <fieldset>
                  <legend hidden>아이템 수정</legend>
                  <label>
                    <span hidden>아이템 수정</span>
                    <input type="text" value="${item.content}" size="40">
                  </label>
                  <button type="submit">완료</button>
                  <button type="button" class="canceler">취소</button>
                </fieldset>
              </form >
            </li>
            <!-- / 수정 중인 아이템 -->
            `;
          }
          return /*html*/ `
            <li>
            
              <p ${item.isComplete ? 'style="color: #09F"' : ''}>${item.content}</p>
              <input 
              type="checkbox" 
              class="complete" ${item.isComplete ? 'checked' : ''}
              data-key = "${key}"
              />
              <button type="button" class="modifier" data-key="${key}">수정</button>
              <button type="button" class="deleter" data-key="${key}">삭제</button>
            </li>
         `;
        })
        .join('')}
      <!-- / 완료된 아이템 -->
    </ul>
  </main>
  `;
};

/**
 * 앱 시작시 실행될 entry 함수
 */
const render = () => {
  const $app = document.querySelector('#app');
  $app.innerHTML = template();

  // 태그 등록
  const $appenderForm = $app.querySelector('form[name="appenderForm"]');
  const $modifiers = $app.querySelectorAll('.modifier');
  const $cancelers = $app.querySelectorAll('.canceler');
  const $deleter = $app.querySelectorAll('.deleter');
  const $modifierForm = $app.querySelector('form[name="modifierForm"]');
  const $complete = $app.querySelectorAll('.complete');

  /** 이벤트 등록 */

  // 아이템 추가 관리
  const addItem = (e) => {
    e.preventDefault();
    const content = $appenderForm.querySelector('input').value.trim();
    if (content.length === 0) {
      return alert('아이템 내용을 입력해주세요');
    }

    state.todoItems.push({
      id: 4,
      createAt: Date.now(),
      content: $appenderForm.querySelector('input').value,
      isComplete: false
    });
    render();
  };
  $appenderForm.addEventListener('submit', addItem);

  // 아이템 수정 버튼 관리
  const editItem = (e) => {
    state.selectedItem = Number(e.target.dataset.key);
    render();
  };
  $modifiers.forEach(($modifier) => {
    $modifier.addEventListener('click', editItem);
  });

  // 아이템 수정 취소 버튼 관리
  const CancelItem = () => {
    state.selectedItem = -1;
    render();
  };
  $cancelers.forEach(($canceler) => {
    $canceler.addEventListener('click', CancelItem);
  });
  (() => {
    document.addEventListener('keydown', (e) => {
      const keyCode = e.keyCode;
      if (keyCode == 27 && state.selectedItem != -1) {
        CancelItem();
      }
    });
  })();

  // 아이템 수정 관리
  const updateItem = (e) => {
    e.preventDefault();
    const content = e.target.querySelector('input').value.trim();
    if (content.length === 0) {
      return alert('아이템 내용을 입력해주세요');
    }
    state.todoItems[state.selectedItem].content = content;
    state.selectedItem = -1;
    render();
  };
  if ($modifierForm) {
    $modifierForm.addEventListener('submit', updateItem);
  }

  // 아이템 삭제 관리
  const deleteItem = (e) => {
    const key = Number(e.target.dataset.key);
    state.todoItems.splice(key, 1);
    render();
  };
  $deleter.forEach(($el) => {
    $el.addEventListener('click', deleteItem);
  });

  // 아이템 토글 관리
  const toggleItem = (e) => {
    const key = Number(e.target.dataset.key);
    const item = state.todoItems[key];
    item.isComplete = !item.isComplete;
    render();
  };
  $complete.forEach(($el) => {
    $el.addEventListener('click', toggleItem);
  });
};

const main = () => {
  render();
};

// 앱 실행
main();
