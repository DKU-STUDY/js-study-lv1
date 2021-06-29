// /**
//  * AppenderForm에서 submit 이벤트가 발생했을 때 처리하는 함수
//  * @param event
//  */
// function handleSubmitAppenderForm (event) {
//   const input = event.target.querySelector('input');
//   alert(`input에 입력된 텍스트: ${input.value}`);
//   alert(`input에 입력된 텍스트의 길이: ${input.value.length}`);
// }

// /**
//  * 앱 시작시 실행될 entry 함수
//  */
// function main () {
//   // 추가 폼 전송 이벤트 등록
//   document.forms.appenderForm.addEventListener('submit', handleSubmitAppenderForm);
// }

// // 앱 실행
// main();

/**
 * 새로 짠 코드
 */

// 고유한 id를 갖도록 수정
// render를 호출할 때마다 이벤트가 등록되는 것을 효율적으로 수정

const $app = document.querySelector('#app');
const $todoList = document.querySelector('.todo-list');
const $appenderForm = $app.querySelector('form[name="appenderForm"]');


const state = {
  todoItems: [
    { id: 1, content: '첫 번째 투두', isComplete: false, createdAt: Date.now() },
    { id: 2, content: '두 번째 투두', isComplete: false, createdAt: Date.now() },
    { id: 3, content: '세 번째 투두', isComplete: false, createdAt: Date.now() },
  ],
  selectedItem: -1
};

const todoTemplate = () => `${state.todoItems.map((todoItem, key) => {
  if(key === state.selectedItem){
    return `
      <li>
        <form name="modifierForm" action="">
          <fieldset>
            <legend hidden>아이템 수정</legend>
            <label>
              <span hidden>아이템 수정</span>
              <input type="text" value="${todoItem.content}" size="40">
            </label>
            <button type="submit">완료</button>
            <button type="button" class="cancelEditBtn">취소</button>
          </fieldset>
        </form>
      </li>
    `;
  }
  return `
    <li>
      <p ${todoItem.isComplete ? 'style="color:#09f;text-decoration-line:line-through"': ''}>
        <input class="complete" type="checkbox" ${todoItem.isComplete ? 'checked' : ''} data-key="${key}"/>
        ${todoItem.content}
      </p>
      <button type="button">완료</button>
      <button type="button" class="modifier" data-key="${key}">수정</button>
      <button type="button" class="deleter" data-key="${key}">삭제</button>
    </li>`;
}).join('')}

`;

const addTodo = (event) => { //event 생략 가능
  event.preventDefault();
  const content = $appenderForm.querySelector('input').value.trim();
  if(content.length === 0) return alert('Todo Item 내용을 입력해주세요');
  const newItem = {
    id: 4,
    createdAt: Date.now(),
    content: content,
    isComplete: false,
  }
  // state.todoItems.push({
  //   id: 4,
  //   createdAt: Date.now(),
  //   content: content,
  //   isComplete: false,
  // });
  render();
  event.target.querySelector('input').value = ''; // input text 입력창 초기화
  event.target.querySelector('input').focus();

};

// 아이템 수정 버튼
const editTodo = (event) => {
  state.selectedItem = Number(event.target.dataset.key);
  render();
  $app.querySelector('form[name="modifierForm"] input').focus();
};

// 아이템 수정
const updateTodo = (event) => {
  event.preventDefault();
  const content = event.target.querySelector('input').value.trim();
  if(content.length === 0) return alert('Todo Item 내용을 입력해주세요');
  state.todoItems[state.selectedItem].content = content;
  state.selectedItem = -1;
  render();
};

const cancelEdit = () => {
  state.selectedItem = -1;
  render();
};

// 아이템 삭제
const deleteTodo = () => {
  const key = Number(event.target.dataset.key);
  state.todoItems.splice(key, 1);
  render();
};

// 아이템 토글
const toggleTodo = () => {
  const key = Number(event.target.dataset.key);
  const item = state.todoItems[key];
  item.isComplete = !item.isComplete;
  render();
};

const render = () => {
  $todoList.innerHTML = todoTemplate();

  // 아이템 추가 관리
  $appenderForm.addEventListener('submit', addTodo);

  // 아이템 수정 버튼 관리
  const $modifiers = $app.querySelectorAll('.modifier');
  $modifiers.forEach(($modifier) => {
    $modifier.addEventListener('click', editTodo);
  });

  // 아이템 수정 관리
  const $modifierForm = $app.querySelector('form[name="modifierForm"]');
  if($modifierForm){
    $modifierForm.addEventListener('submit', updateTodo); //modifierForm이 있을 때 이벤트를 등록
    $modifierForm.addEventListener('keyup', (event) => {
      if(event.key!=='Escape') return;
      state.selectedItem = -1;
      render();
    });
  } 

  // 아이템 수정 상태에서 취소 버튼 관리
  const $cancelEditBtn = $app.querySelector('.cancelEditBtn');
  if($cancelEditBtn) {
    $cancelEditBtn.addEventListener('click', cancelEdit);
    
  }

  // 아이템 삭제
  const $deleter = $app.querySelectorAll('.deleter');
  $deleter.forEach(($el) => {
    $el.addEventListener('click', deleteTodo);
  });

  // 아이템 토글
  const $complete = $app.querySelectorAll('.complete');
  $complete.forEach(($el) => {
    $el.addEventListener('click', toggleTodo);
  });


}

render();
