/**
  description : implementaion todoList using Vanilla JS
  e-mail : cksgnlcjswoo@naver.com
  author : 김찬휘 
 */
const state = {

  items : [
  {id:1,content:'first item',isComplete:false,createtime:Date.now() },
  {id:2,content:'second item',isComplete:false,createtime:Date.now() },
  {id:3,content:'third item',isComplete:false,createtime:Date.now() },
  ],
}

console.log(state);


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
      <!-- 완료된 아이템 -->
      ${state.items.map(function(item) {
        return `
        <li>
          <p style="color: #09F">
            ${item.content}
          </p>
          <button type="button">취소</button>
          <button type="button">수정</button>
          <button type="button">삭제</button>
        </li>
        `
      }).join('')}
     
      <!-- / 완료된 아이템 -->

      <!-- 수정 중인 아이템 -->
     

      
     
      
     
    </ul>
  </main>
  `
} 

function main () {
  // 내부에 template을 넣음
  document.querySelector('#app').innerHTML = template();
}

// 앱 실행
main();
