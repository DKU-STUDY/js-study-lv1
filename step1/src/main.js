const state = {
  todoItems: [
    { id: 1, content: 'first item', isComplete: false, createdAt: Date.now() },
    { id: 1, content: 'second item', isComplete: false, createdAt: Date.now() },
    { id: 1, content: 'third item', isComplete: false, createdAt: Date.now() },
    { id: 1, content: 'fourth item', isComplete: false, createdAt: Date.now() },
    { id: 1, content: 'fifth item', isComplete: false, createdAt: Date.now() },
  ],
}

function template() {
  return `
  
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
     <li>
       <p style="color: #09F">
         1주차: Todo List 만들기
       </p>
       <button type="button">취소</button>
       <button type="button">수정</button>
       <button type="button">삭제</button>
     </li>
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

     <!-- 아이템의 기본 상태들 -->
     <li>
       <p>
         3주차: ExpressJS로 API 서버 만들기
       </p>
       <button type="button">완료</button>
       <button type="button">수정</button>
       <button type="button">삭제</button>
     </li>
     <li>
       <p>
         4주차: API 연동
       </p>
       <button type="button">완료</button>
       <button type="button">수정</button>
       <button type="button">삭제</button>
     </li>
     <li>
       <p>
         5주차: 배포하기
       </p>
       <button type="button">완료</button>
       <button type="button">수정</button>
       <button type="button">삭제</button>
     </li>
     <!-- / 아이템의 기본 상태들 -->
   </ul>`
}

/**
 * AppenderForm에서 submit 이벤트가 발생했을 때 처리하는 함수
 * @param event
 */
function handleSubmitAppenderForm(event) {
  event.preventDefault();
  const input = event.target.querySelector('input');
  alert(`input에 입력된 텍스트: ${input.value}`);
  alert(`input에 입력된 텍스트의 길이: ${input.value.length}`);
}

/**
 * 앱 시작시 실행될 entry 함수
 */
function main() {
  document.querySelector("#app").innerHTML = template();
  // 추가 폼 전송 이벤트 등록
  document.forms.appenderForm.addEventListener('submit', handleSubmitAppenderForm);
}

// 앱 실행
main();
