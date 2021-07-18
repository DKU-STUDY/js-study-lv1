import {state} from "./state.js";

export var itemTemplate = (item,key) => `
      <li>
        ${key === state.idx ? `<form name="modifierForm" action="">
          <fieldset>
            <legend hidden>아이템 수정</legend>
            <label>
              <span hidden>아이템 수정</span>
              <input type="text" value="${item.content}" size="40">
            </label>
            <button type="submit">완료</button>
            <button type="button" class="cancle">취소</button>
          </fieldset>
        </form>` 
      : 
      `<p ${item.isComplete ? ' style="color:#09F"':''}>
        <input type="checkbox" 
        class="complete" data-key="${key}" 
        ${item.isComplete ? 'checked' : ''}/>
        ${item.content}
      </p>
      <button type="button">취소</button>
      <button type="button" class="modifier" data-key="${key}">수정</button>
      <button type="button" class="remover" data-key="${key}">삭제</button>`}
    </li>
`

export var template = () =>
`
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
   ${state.items.map(itemTemplate).join('')}
 </ul>
</main>
`