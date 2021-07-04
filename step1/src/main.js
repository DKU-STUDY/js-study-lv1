const state = {
  todoItems: [
    { id: 1, content: 'first item', isComplete: false, createdAt: Date.now() },
    { id: 2, content: 'second item', isComplete: false, createdAt: Date.now() },
    { id: 3, content: 'third item', isComplete: false, createdAt: Date.now() },
    { id: 4, content: 'fourth item', isComplete: false, createdAt: Date.now() },
    { id: 5, content: 'fifth item', isComplete: false, createdAt: Date.now() },
  ],
  selectedItem:0
}

const itemTemplate = ({content, id, isComplete, highlight}) =>
  
  
  ${todoItems.items.map(({ content, id, isComplete, highlight }) => `
    <li>
      ${todoItems.selectedItem === item.id ? `
      <form name="modifierForm" action="" id=${id}>
      <fieldset>
        <legend hidden>아이템 수정</legend>
        <label>
          <span hidden>아이템 수정</span>
          <input type="text" value=${content} size="40">
        </label>
        <button type="submit">완료</button>
        <button type="button">취소</button>
      </fieldset>
    </form>`: `
      <p ${item.highlight ? `style="color: #09F"`:``}>${content}</p>
      <button type="button">취소</button>
      <button type="button" class="modifier" data-key="${key}">수정</button>
      <button type="button" class="deleter" data-key="${key}">삭제</button>
    </li>`;
  }).join('')}



  
   `<h1>📃 TodoList</h1>
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
   ${state.todoItems.map(function (item, key) {
     if (key === state.selectedItem) {
       return`    <!-- 수정 중인 아이템 -->
       <li>
         <form name="modifierForm" action="">
           <fieldset>
             <legend hidden>아이템 수정</legend>
             <label>
               <span hidden>아이템 수정</span>
               <input type="text" value=${item.content} size="40">
             </label>
             <button type="submit">완료</button>
             <button type="button">취소</button>
           </fieldset>
         </form>
       </li>
       <!-- / 수정 중인 아이템 -->`
     }
    return `
    <li>
      <p style="color: #09F">${item.content}</p>
      <button type="button">취소</button>
      <button type="button" class="modifier" data-key="${key}">수정</button>
      <button type="button" class="deleter" data-key="${key}">삭제</button>
    </li>`;
  }).join('')}
   
  </main>`
}

/**

/**
 * 앱 시작시 실행될 entry 함수
 */
 //아이템 추가 영역
 const itemAdd = function (event) {

  event.preventDefault();
  const content = $appender.querySelector('input').value.trim();
  if (content.length === 0) {
  return alert("아이템 내용을 입력해주세요");
  }
  state.todoItems.push({
    id: 4,
    createdAt: Date.now(),
    content: content,
    isComplete: False
  });
  render();
}
//아이템 수정 버튼 관리

const editItem = function (event) {
  state.selectedItem = Number(event.target.dataset.key);
  render();
}
//아이템 수정
const updateItem = function (event) {
  event.preventDefault();
  const content = $appender.querySelector('input').value.trim();
  if (content.length === 0) {
  return alert("아이템 내용을 입력해주세요");
  }
  state.todoItems[state.selectedItem].content = content;
  state.selectedItem = -1;
  render();
}
const deleteItem = function (event) {
  const key = Number(event.target.dataset.key);
  state.todoItems.splice(key, 1);
  render();
}
const resetItem = function(event){
  event.preventDefault();
  state.selectedItem = -1;
  render();
}


function render() {
  const $app = document.querySelector("#app")
  $app.innerHTML = template();
  //이벤트 등록
  const $appenderForm = $app.querySelector('form[name="appenderForm"]');
  const $modifiers = $app.querySelectorAll('.modifier');
  const $modifierForm = $app.querySelector('form[name="modifierForm"]');
  const $deleters = $app.querySelectorAll(".deleter");
  const $complete = $app.querySelectorAll(".complete");
  /** 이벤트 등록 **/
   
  $appender.addEventListener('submit', itemAdd);
  
  // 아이템 수정 관리
  $modifiers.forEach(function ($modifier) {
    $modifier.addEventListener("click", editItem)
  })

  

  if ($modifierForm) {
    $modifierForm.addEventListener('reset', resetItem);
    $modifierForm.addEventListener('keydown', (event) => {if(event.code ==='Escape') {state.selectedItem=-1; render();}});
  }
  //아이템 삭제 관리//

  $deleters.forEach(function ($deleter) {
    $deleter.addEventListener("click", deleteItem)
  });

}
// 앱 실행
function main(){
  render();
}

  main();