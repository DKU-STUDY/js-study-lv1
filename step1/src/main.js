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
  ]
};

const todoTemplate = () => `${state.todoItems.map((todoItem) => {
  return `
    <li>
      <p>
        ${todoItem.content}
      </p>
      <button type="button">완료</button>
      <button type="button">수정</button>
      <button type="button">삭제</button>
    </li>`;
}).join('')}

`;

const addTodo = (event) => {
  event.preventDefault();
  // console.log($appenderForm.querySelector('input').value);
  const content = $appenderForm.querySelector('input').value;
  if(content.trim().length === 0) return alert('Todo Item 내용을 입력해주세요');

  state.todoItems.push({
    id: 4,
    createdAt: Date.now(),
    content: $appenderForm.querySelector('input').value,
    isComplete: false,
  });
  render();
  event.target.querySelector('input').value = ''; // input text 입력창 초기화

};


const render = () => {
  $todoList.innerHTML = todoTemplate();
  
  $appenderForm.addEventListener('submit', addTodo);

}

render();
