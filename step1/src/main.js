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
      console.log(key);
      console.log('selectedItem'+ state.selectedItem);
      if (key === state.selectedItem) { // 수정 버튼 누르면
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
                <button class="canceler" type="button">취소</button>
              </fieldset>
            </form>
          </li>
        `
      }
        return /* default */` 
            <li>
              <p>${item.content}</p>
              <button type="button">취소</button>
              <button class='modifier' data-key="${key}" type="button">수정</button>
              <button class='deleter' type="button">삭제</button>
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

  // 태그 등록
  const $appenderForm = $app.querySelector('form[name="appenderForm"]');
  const $modifiers = $app.querySelectorAll('.modifier');
  const $modifierForm = $app.querySelector('form[name="modifierForm"]');
  const $cancelers = $app.querySelectorAll('.canceler');
  const $deleters = $app.querySelectorAll('.deleter');
  
  // 아이템 추가
  const addItem = function (event) {
    event.preventDefault();
    const content = $appenderForm.querySelector('input').value.trim();
    if (content.length === 0) {
      return alert('아이템 이름을 입력해주세요');
    }
    state.todoItems.push({id: 4, content: $appenderForm.querySelector('input').value, isComplete: false, createAt: Date.now(),})
    render();
  }
  $appenderForm.addEventListener('submit', addItem);
  
  // 수정 버튼 클릭 => input으로 DOM 변경
  const editItem = function (event) {
    state.selectedItem = Number(event.target.dataset.key);
    render();
  }
  $modifiers.forEach(function ($modifier) {
    $modifier.addEventListener('click', editItem);
  })

  // 아이템 수정 (update)
  const updateItem = function (event) {
    event.preventDefault();
    const content = event.target.querySelector('input').value.trim();
    if (content.length === 0) {
      return alert('아이템 이름을 입력해주세요');
    }
    state.todoItems[state.selectedItem].content = content;
    state.selectedItem = -1;
    render();
  }
  if ($modifierForm) {
    $modifierForm.addEventListener('submit', updateItem);
  }

  // 아이템 수정 취소 (취소 버튼)
  const cancelItem = function (event) {
    state.selectedItem = -1;
    render();
  }
  $cancelers.forEach(function ($canceler) {
    $canceler.addEventListener('click', cancelItem);
  })

  // 아이템 수정 취소 (esc key)
  window.addEventListener('keydown', function(event){
    if(event.key === "Escape") {
      state.selectedItem = -1;
      render();
    }
  });
  
  // 아이템 삭제
  const deleteItem = function (event) {
    const key = Number(event.target.dataset.key);
    state.todoItems.splice(key, 1);
    render();
  }
  $deleters.forEach(function ($deleter) {
    $deleter.addEventListener('click', deleteItem)
  })


}

function main () {
  render();
}

// 앱 실행
main();
