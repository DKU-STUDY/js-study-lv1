const state = {
  todoItems =[],
  selectedItem:0
}
let id = 0;

  
  
const itemTemplate = ({ content, id, isComplete, highlight }) => `
    <li>
      ${todoItems.selectedItem === id ? `
      <form name="modifierForm" action="" id=${id}>
      <fieldset>
        <legend hidden>아이템 수정</legend>
        <label>
          <span hidden>아이템 수정</span>
          <input type="text" value=${content} size="40">
        </label>
        <button type="submit">완료</button>
        <button type="button" class="cancel">취소</button>
      </fieldset>
    </form>`: `
     
      <p ${item.highlight ? `style="color: #09F"` : ``} ${isComplete ? `class="finish"` : ``}>
      <input type="checkbox" id="${id}" ${highlight ? `checked ` : ``}/>
      ${content}</p>
      <button type="button" class="complete id="${id}">완료</button>
      <button type="button" class="modifier" id="${id}">수정</button>
      <button type="button" class="deleter" id="${id}">삭제</button>
    `}
    </li>`
    
const template = () => `
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
  ${state.todoItems.map(itemTemplate).join('')}
</ul>
`;

/**

/**
 * 앱 시작시 실행될 entry 함수
 */
 //아이템 추가 영역
function checklength(item) {
  if (item.length === 0) {
    return alert("아이템 내용을 입력해주세요");
  } else {}
}

const itemAdd = function (event) {

event.preventDefault();
const content = $appenderForm.querySelector('input').value.trim();
checklength(content);

state.todoItems.push({
  id: state.todoItems.length,
  createdAt: Date.now(),
  content: content,
  isComplete: false
});
render();
}

// 아이템 수정 관리
const editItem = function (event) {
  state.selectedItem = Number(event.target.id);
  render();
}
//아이템 수정
const updateItem = function (event) {
  event.preventDefault();
  const content = $modifierForm.querySelector('input').value.trim();
  checklength(content);
  state.todoItems[state.selectedItem].content = content;
  state.selectedItem = -1;
  render();
}
//아이템 수정 취소, esc키 //
const resetItem = function(event){
  event.preventDefault();
  state.selectedItem = -1;
  render();
}
//아이템 삭제 관리//
const deleteItem = function (event) {
  const key = Number(event.target.id);
  state.todoItems.splice(key, 1);
  render();
}    

const toggleItem = function (event) {
  const key = Number(event.target.id);
  const item = state.todoItems[key];
  item.isComplete = !item.isComplete;
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
  const $cancellers = $app.querySelectorAll(".cancel");

  $appenderForm.addEventListener('submit', itemAdd);

  $modifiers.forEach(($modifier)=> $modifier.addEventListener("click",editItem));  


  if ($modifierForm) {
    $modifierForm.addEventListener('submit', updateItem);
    $modifierForm.addEventListener('reset', resetItem);
    $modifierForm.addEventListener('keydown', (event) => {if(event.code ==='Escape') {state.selectedItem=-1; render();}}
  }


  $cancellers.forEach(($canceller) => $canceller.addEventListener("click", resetItem);

  $deleters.forEach(($deleter)=> $deleter.addEventListener("click", deleteItem));

  $complete.forEach(($el)=> $el.addEventListener("click", toggleItem));
}
// 앱 실행
function main(){
render();
}


main();