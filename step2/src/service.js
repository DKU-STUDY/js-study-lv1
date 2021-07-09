import {state} from "./state.js";
import {template} from "./template.js"
/*item 추가 함수 */
export var addItem = function (event) {
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
export var editItem = function(event) {
    state.idx = Number(event.target.dataset.key);
    render();
  }
  
  /* 수정 내용 반영 함수 */
export var updateItem = function(event) {
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
export var cancleUpdate = function(event) {
    event.preventDefault();
    state.idx = -1;
    render();
  }
  
  /*item삭제 함수 */
export var deleteItem = function(event) {
    const key = Number(event.target.dataset.key); 
    state.items.splice(key,1);
    render();
  }
  
export var toggleItem = function(event) {
    const key = Number(event.target.dataset.key);
    const it = state.items[key];
    it.isComplete = !it.isComplete;
    render();
  }

export var render = function() {
  // app 변수에 template을 넣음(렌더링)
  const $app = document.querySelector('#app');
  $app.innerHTML = template();
  
  $app.querySelector('form[name="appenderForm"]')
    .addEventListener('submit',addItem);
      
  $app.querySelectorAll('.modifier')
      .forEach(function($modifier) {
        $modifier.addEventListener('click', editItem);
      });
  
  $app.querySelector('form[name="modifierForm"]') ?.addEventListener('submit',updateItem);
  
  $app.querySelector('form[name="modifierForm"]') ?.addEventListener('keyup',function(event){
        if(event.key == "Escape") {
          state.idx = -1;
          render();
        }
      });
  
  $app.querySelectorAll('.remover')
      .forEach(function($element) {
    $element.addEventListener('click', deleteItem);
  });
  
  $app.querySelectorAll('.complete')
      .forEach(function($element) {
        $element.addEventListener('click',toggleItem)
      });
  
  $app.querySelectorAll('.cancle')
      .forEach(function($element) {
        $element.addEventListener('click',cancleUpdate);
      });
}