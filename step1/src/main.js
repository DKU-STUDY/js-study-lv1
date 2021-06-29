<<<<<<< Updated upstream
=======
const state = {
  todoItems: [
   
  ],  selectedItem:-1
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
             <button type="reset">취소</button>
           </fieldset>
         </form>
       </li>
       <!-- / 수정 중인 아이템 -->`
     }
    return `
    <li>
      <input type="checkbox" class="complete" data-key=${key} ${item.isComplete? `checked ` : ``}/>
      <p ${item.isComplete? `style="color: #09F"`: ``}>${item.content}</p>
      
      
      <button type="button">취소</button>
      <button type="button" class="modifier" data-key="${key}">수정</button>
      <button type="button" class="deleter" data-key="${key}">삭제</button>
    </li>`;
  }).join('')}
   </ul>
  </main>
  `
}


>>>>>>> Stashed changes
/**
 * AppenderForm에서 submit 이벤트가 발생했을 때 처리하는 함수
 * 
 */
<<<<<<< Updated upstream
function handleSubmitAppenderForm (event) {
  const input = event.target.querySelector('input');
  alert(`input에 입력된 텍스트: ${input.value}`);
  alert(`input에 입력된 텍스트의 길이: ${input.value.length}`);
}
=======
>>>>>>> Stashed changes

/**
 * 앱 시작시 실행될 entry 함수
 */
<<<<<<< Updated upstream
function main () {
  // 추가 폼 전송 이벤트 등록
  document.forms.appenderForm.addEventListener('submit', handleSubmitAppenderForm);
}

// 앱 실행
main();
=======




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
    //아이템 추가 영역
  const itemAdd = function (event) {

    event.preventDefault();
    const content = $appenderForm.querySelector('input').value.trim();
    if (content.length === 0) {
    return alert("아이템 내용을 입력해주세요");
    }
    state.todoItems.push({
      createdAt: Date.now(),
      content: content,
      isComplete: false
    });
    render();
  }
  $appenderForm.addEventListener('submit', itemAdd);
  //아이템 수정 버튼 관리

  const editItem = function (event) {
    state.selectedItem = Number(event.target.dataset.key);
    render();
  }
    // 아이템 수정 관리
  $modifiers.forEach(($modifier)=>
    $modifier.addEventListener("click",editItem));
  

  //아이템 수정
  const updateItem = function (event) {
    event.preventDefault();
    const content = $modifierForm.querySelector('input').value.trim();
    if (content.length === 0) {
    return alert("아이템 내용을 입력해주세요");
    }
    state.todoItems[state.selectedItem].content = content;
    state.selectedItem = -1;
    render();
  }
  if ($modifierForm) {
    $modifierForm.addEventListener('submit', updateItem);
  }
  //아이템 수정 취소, esc키 //
  const resetItem = function(event){
    event.preventDefault();
    state.selectedItem = -1;
    render();
  }
  if ($modifierForm) {
    $modifierForm.addEventListener('reset', resetItem);
    $modifierForm.addEventListener('keydown', (event) => {if(event.code ==='Escape') {state.selectedItem=-1; render();}});
  }
    //아이템 삭제 관리//
  const deleteItem = function (event) {
    const key = Number(event.target.dataset.key);
    state.todoItems.splice(key, 1);
    render();
  }
  $deleters.forEach(($deleter)=>
    $deleter.addEventListener("click", deleteItem));
  

  const toggleItem = function (event) {
    const key = Number(event.target.dataset.key);
    const item = state.todoItems[key];
    item.isComplete = !item.isComplete;
    render();
  }
  $complete.forEach(($el)=>
    $el.addEventListener("click", toggleItem));
  

}
// 앱 실행
function main(){
  render();
}


main();
>>>>>>> Stashed changes
