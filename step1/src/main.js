/**
  description : implementaion todoList using Vanilla JS
  e-mail : cksgnlcjswoo@naver.com
  author : 김찬휘 
 */

/*item 추가 함수 */
const addItem = function (event) {
  event.preventDefault();
  const $app = document.querySelector('#app');
  const $appenderForm = $app.querySelector('form[name="appenderForm"]');
  const content = $appenderForm.querySelector('input').value.trim(); //앞 뒤 빈칸 제거
  
  if(content.length === 0) {
    return alert("enter content");
  }

  state.items.push({
    id: state.items.length,
    content: $appenderForm.querySelector('input').value,
    isComplete: false,
    createtime: Date.now(),
  })  
  render();
}

/*item 수정버튼 눌렀을 때 처리 함수 */
const editItem = function(event) {
  state.idx = Number(event.target.dataset.key);
  render();
}

/* 수정 내용 반영 함수 */
const updateItem = function(event) {
  event.preventDefault();
  const content = event.target.querySelector('input').value.trim();

  if(content.length === 0) {
    return alert("enter content");
  }

  state.items[state.idx].content = content;
  state.idx = -1;
  render();
}

/*수정 취소 함수 */
const cancleUpdate = function(event) {
  event.preventDefault();
  state.idx = -1;
  render();
}

/*item삭제 함수 */
const deleteItem = function(event) {
  const key = Number(event.target.dataset.key); 
  state.items.splice(key,1);
  render();
}

const toggleItem = function(event) {
  const key = Number(event.target.dataset.key);
  const it = state.items[key];
  it.isComplete = !it.isComplete;
  render();
}

const state = {
  items : [],
  idx : -1,
}

const itemTemplate = (item,key) => `
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

const template = () =>
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

function render () {
  // app 변수에 template을 넣음(렌더링)
  const $app = document.querySelector('#app');
  $app.innerHTML = template();

  const $appenderForm = $app.querySelector('form[name="appenderForm"]');
  const $modifiers = $app.querySelectorAll('.modifier');  
  const $modifierForm = $app.querySelector('form[name="modifierForm"]');
  const $deleters = $app.querySelectorAll('.remover');
  const $complete = $app.querySelectorAll('.complete');
  const $canclers = $app.querySelectorAll('.cancle');

  $appenderForm.addEventListener('submit',addItem);

  $modifiers.forEach(function($modifier) {
    $modifier.addEventListener('click', editItem);
  })

  /*수정완료 눌렀을 때 갱신 */  
  if($modifierForm) {
    $modifierForm.addEventListener('submit',updateItem);
  }

  $canclers.forEach(function($element) {
    $element.addEventListener('click',cancleUpdate);
  })

  if($modifierForm) {
    $modifierForm.addEventListener('keyup',function(event){
      if(event.key == "Escape") {
        state.idx = -1;
        render();
      }
    });
  }

  $deleters.forEach(function($element) {
    $element.addEventListener('click', deleteItem);
  })
  
  $complete.forEach(function($element) {
    $element.addEventListener('click',toggleItem)
  })
}



function main () {
  render()
}
// 앱 실행
main();
