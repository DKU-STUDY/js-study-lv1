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
  idx : -1,
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

      ${state.items.map(function(item,key) {
        
        if(key === state.idx) {
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
                  <button type="button" class="cancle">취소</button>
                </fieldset>
              </form>
            </li>
          `
        }
        
        return `
        <li>
          <p ${item.isComplete ? ' style="color:#09F"':''}>
            <input type="checkbox" 
            class="complete" data-key="${key}" 
            ${item.isComplete ? 'checked' : ''}/>
            ${item.content}
          </p>
          <button type="button">취소</button>
          <button type="button" class="modifier" data-key="${key}">수정</button>
          <button type="button" class="remover" data-key="${key}">삭제</button>
        </li>
        `
      }).join('')}
    
    </ul>
  </main>
  `
} 

function render () {
  // app 변수에 template을 넣음(렌더링)
  const $app = document.querySelector('#app');
  $app.innerHTML = template();

  //위에서 app변수에 만든 form(첫번째거)에서 버튼 눌렀을 때 이벤트콜백 등록
  const $appenderForm = $app.querySelector('form[name="appenderForm"]');
  const $modifiers = $app.querySelectorAll('.modifier');  
  const $modifierForm = $app.querySelector('form[name="modifierForm"]');
  const $deleters = $app.querySelectorAll('.remover');
  const $complete = $app.querySelectorAll('.complete');
  const $canclers = $app.querySelectorAll('.cancle');

  /*item 추가 이벤트 */
  const addItem = function (event) {
    event.preventDefault();
    const content = $appenderForm.querySelector('input').value.trim(); //앞 뒤 빈칸 제거
    if(content.length === 0) {
      return alert("enter content");
    }

    state.items.push({
      id: 4,
      content: $appenderForm.querySelector('input').value,
      isComplete: false,
      createtime: Date.now(),
    })
    render();
  }

  $appenderForm.addEventListener('submit',addItem);

  /*item 수정버튼 눌렀을 때 이벤트 */
  const editItem = function(event) {
    state.idx = Number(event.target.dataset.key);
    render();
  }

  $modifiers.forEach(function($modifier) {
    $modifier.addEventListener('click', editItem);
  })

  /* 수정 내용 반영 */
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

  /*수정완료 눌렀을 때 갱신 */  
  if($modifierForm) {
    $modifierForm.addEventListener('submit',updateItem);
  }

  const cancleUpdate = function(event) {
    event.preventDefault();
    state.idx = -1;
    render();
  }

  $canclers.forEach(function($element) {
    $element.addEventListener('click',cancleUpdate);
  })

  /*삭제 관리 */
  const deleteItem = function(event) {
    const key = Number(event.target.dataset.key); 
    state.items.splice(key,1);
    render();
  }
  $deleters.forEach(function($element) {
    $element.addEventListener('click', deleteItem);
  })

  const toggleItem = function(event) {
    const key = Number(event.target.dataset.key);
    const it = state.items[key];
    it.isComplete = !it.isComplete;
    render();
  }
  
  $complete.forEach(function($element) {
    $element.addEventListener('click',toggleItem)
  })

}

function main () {
  render()
}

// 앱 실행
main();
