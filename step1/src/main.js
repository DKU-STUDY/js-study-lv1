/**
 * todoList의 아이템들을 관리하기 위한 객체
 */
const todoItems = {
  items: [],              // ex) { id: 1, content: 'todoList만들기', highlight: false, isComplete: false, createdAt: Date.now()}    
  seletedItem: -1,        // 특정 아이템 체크 여부를 확인하기 위한 변수
};

/**
 * 템플릿을 제공하는 함수 
 */
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
      ${todoItems.items.map(function(item) {
        if(todoItems.seletedItem == item.id) {
          return `
            <li>
              <form name="modifierForm" action="" id="${item.id}">
                <fieldset>
                  <legend hidden>아이템 수정</legend>
                  <label>
                    <span hidden>아이템 수정</span>
                    <input type="text" value="${item.content}" size="40">
                  </label>
                  <button type="submit">완료</button>
                  <button type="button" class="cancel">취소</button>
                </fieldset>
              </form>
            </li>
          `
      }
      return `
        <li>
          <p ${item.highlight ? 'style="color:#09F"' : ''} ${item.isComplete ? 'class="finish"' : ''}>
            <input type="checkbox" id="${item.id}" ${item.highlight ? ' checked' : ''}>
            ${item.content}
          </p>
          <button type="button" class="complete" id="${item.id}">완료</button>
          <button type="button" class="modify" id="${item.id}">수정</button>
          <button type="button" class="delete" id="${item.id}">삭제</button>
        </li>
      `
    }).join('')}
    </ul>
  `
}

/**
 * 랜더링 함수
 */
const render = function() {
  const $app = document.querySelector('#app');
  $app.innerHTML = template();
  
  /** 아이템 추가 영역 **/
  const $appenderForm = document.querySelector('form[name="appenderForm"]');

  const addItem = function(event) {     // 아이템 생성 함수
    event.preventDefault();             // 새로고침되는 default 동작 방지

    const $inputInfo = $appenderForm.querySelector('input');
    const value = $inputInfo.value.trim();
    
    if(value.length === 0) {
      $inputInfo.value = "";            // 공백 입력 시 초기화
      return alert('아이템 이름을 입력하세요!');
    }

    const obj = {                       // 아이템 객체 생성
      id: todoItems.items.length + 1,
      content: $inputInfo.value,
      highlight: false,
      isComplete: false,
      createdAt: Date.now()
    };
    todoItems.items.push(obj);          // todoList에 push
    render();                           // 랜더링을 통해 반영
  };
  $appenderForm.addEventListener('submit', addItem);
  /** 아이템 추가 영역 **/

  /** 아이템 삭제 영역 **/
  const $delete = document.querySelectorAll('.delete'); // 삭제 버튼 모두 조회

  const deleteItem = function(event) {
    const delBtn = event.target;

    todoItems.items = todoItems.items.filter(function(obj) {  // 삭제 버튼을 누른 아이템을 제외하기 위한 filter
      return obj.id !== Number(delBtn.id);
    });
    render();
  };
  $delete.forEach(function(delBtn) {
    delBtn.addEventListener('click', deleteItem);
  })
  /** 아이템 삭제 영역 **/

  /** 아이템 수정 영역 **/

  // 수정 버튼 관리
  const $modify = document.querySelectorAll('.modify'); // 수정 버튼 모두 조회

  const modifyItem = function(event) {
      const modBtn = event.target;

      todoItems.seletedItem = modBtn.id;                // 수정 버튼을 누른 아이템을 selectedItem을 통해 체크
      render();
  };
  $modify.forEach(function(modBtn) {
    modBtn.addEventListener('click', modifyItem);
  })

  // 수정 버튼 -> 완료 버튼 관리
  const $modifierForm = document.querySelector('form[name="modifierForm"]'); // 수정 form 조회
  
  if($modifierForm) { // 수정 form이 template에 있을 경우
    const updateItem = function(event) {
      event.preventDefault();
      
      const $inputInfo = $modifierForm.querySelector('input');
      const value = $inputInfo.value.trim();

      if(value.length === 0) {
        $inputInfo.value = "";            // 공백 입력 시 초기화
        return alert('아이템 이름을 입력하세요!');
      }

      const $obj_id = Number($modifierForm.id);
      const idx = todoItems.items.map(obj => obj.id).indexOf($obj_id);  // 해당 id를 가진 객체의 인덱스 조회
      todoItems.items[idx].content = value;
      todoItems.seletedItem = -1;         // 수정이 완료되었기 때문에 수정 form 출력 x
      render();
    }
    $modifierForm.addEventListener('submit', updateItem);


    // 수정 버튼 -> 취소 버튼 관리
    const $cancelBtn = $modifierForm.querySelector('.cancel'); // 취소 버튼 조회

    const cancelModify = function(event) {    // 취소 버튼 클릭 시 기존의 화면 유지
      todoItems.seletedItem = -1;       
      render();
    }
    $cancelBtn.addEventListener('click', cancelModify);
    $modifierForm.onkeydown = function(event) {   // esc키 누를 시 수정 취소
      if(event.keyCode == 27) {
        cancelModify();
      }
    }
  }
  /** 아이템 수정 영역 **/

  /** 아이템 토글 영역 **/
  const $toggle = document.querySelectorAll('input[type="checkbox"]');  // toggle 체크 박스 조회

  const checkItem = function(event) {
    const box = event.target;
    const idx = todoItems.items.map(obj => obj.id).indexOf(Number(box.id)); // 체크된 객체의 인덱스 조회
    todoItems.items[idx].highlight = !todoItems.items[idx].highlight;     // 해당 객체의 하이라이트 여부 변경
    render();
  }
  $toggle.forEach(function(box) {
    box.addEventListener('change', checkItem);
  })

  /** 아이템 완료 영역 -> 완료 버튼 클릭 시 line-through를 통해 완료 표시 가능 **/
  const $complete = document.querySelectorAll('.complete');  // 완료 버튼 모두 조회

  const completeItem = function(event) {
    const btn = event.target;
    const idx = todoItems.items.map(obj => obj.id).indexOf(Number(btn.id)); // 체크된 객체의 인덱스 조회
    todoItems.items[idx].isComplete = !todoItems.items[idx].isComplete; // 해당 객체의 완료 여부 변경
    render();
  }
  $complete.forEach(function(btn) {
    btn.addEventListener('click', completeItem);
  })
};

function main() {
  render();
}

// 앱 실행
main();