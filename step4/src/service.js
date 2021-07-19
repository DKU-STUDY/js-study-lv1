import {state} from "./state.js";
import {template} from "./template.js"

function postData(url = '', data = {}) {
  // Default options are marked with *
    return fetch(url, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, cors, *same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json',
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrer: 'no-referrer', // no-referrer, *client
        body: JSON.stringify(data), // body data type must match "Content-Type" header
    })
    .then(response => response.json()); // parses JSON response into native JavaScript objects
}

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

    postData('/app/items', {content: content})
    .then(data => console.log(JSON.stringify(data))) // JSON-string from `response.json()` call
    .catch(error => console.error(error));
    
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

    fetch(`/app/items/${state.idx +1}`, {
      method: 'PUT', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, cors, *same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
          'Content-Type': 'application/json',
          // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: 'follow', // manual, *follow, error
      referrer: 'no-referrer', // no-referrer, *client
      body: JSON.stringify({content:content}), // body data type must match "Content-Type" header
    }).then(res=>res.json())
      .then(console.log("updated completed!"));

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

    fetch(`app/items/${key + 1}`, {
      method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, cors, *same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json',
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrer: 'no-referrer', // no-referrer, *client
    }).then(res => res.json())
      .then(console.log("item removed!"))

    render();
  }
  
export var toggleItem = function(event) {
    const key = Number(event.target.dataset.key);
    const it = state.items[key];
    it.isComplete = !it.isComplete;
    render();
  }

export var render = async function() {
  /*처음 랜더링 할 때 */

  await fetch('/app/items', {
    method: 'GET', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, cors, *same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
          'Content-Type': 'application/json',
          // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: 'follow', // manual, *follow, error
      referrer: 'no-referrer', // no-referrer, *client
  }).then(res => res.json())
    .then(function(item) {
      for(let i = 0; i< item.length;++i)
        state.items[i] = item[i];
      console.log("1",state.items)

      })

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

