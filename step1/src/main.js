/**
 * todoList의 아이템들을 관리하기 위한 객체
 */
const todoItems = {
  items: [],              // ex) { id: 1, content: 'todoList만들기', highlight: false, isComplete: false, createdAt: Date.now()}    
  selectedItem: -1,        // 특정 아이템 체크 여부를 확인하기 위한 변수
};

const itemTemplate = ({id, content, highlight, isComplete}) => `
        <li>
            ${todoItems.selectedItem == id ? `
                <form name="modifierForm" action="" id="${id}">
                    <fieldset>
                        <legend hidden>아이템 수정</legend>
                        <label>
                            <span hidden>아이템 수정</span>
                            <input type="text" value="${content}" size="40">
                        </label>
                            <button type="submit">완료</button>
                            <button type="button" class="cancel">취소</button>
                    </fieldset>
                </form>   
        `   :   `
                <p ${highlight ? 'style="color:#09F"' : ''} ${isComplete ? 'class="finish"' : ''}>
                    <input type="checkbox" id="${id}" ${highlight ? ' checked' : ''}>
                    ${content}
                </p>
                <button type="button" class="complete" id="${id}">완료</button>
                <button type="button" class="modify" id="${id}">수정</button>
                <button type="button" class="delete" id="${id}">삭제</button>
            `}
        </li>
    `

/**
 * 템플릿을 제공하는 함수 
 */
const template = () =>  `
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
        ${todoItems.items.map(itemTemplate).join('')}
    </ul>
  `

/**
 * 랜더링 함수
 */
const render = function() {
    const $app = document.querySelector('#app');
    $app.innerHTML = template();
    setBtnHandler();
};

/**
 * 아이템 추가 함수
 */
 const addItem = function(event) {
  event.preventDefault();

  const $inputInfo = this.querySelector('input');
  const value = $inputInfo.value.trim();
  
  if(value.length === 0) {
    $inputInfo.value = "";                                                    // 공백 입력 시 초기화
    return alert('아이템 이름을 입력해주세요!');
  }

  todoItems.items.push({                                                      // 아이템 객체 생성 후 todoList에 push
    id: todoItems.items.length + 1,
    content: $inputInfo.value,
    highlight: false,
    isComplete: false,
    createdAt: Date.now()
  });                                                  

  render();                                                                       // 템플릿의 모든 버튼에 대한 handler 등록
};

/**
 * 아이템 삭제 함수
 */
const deleteItem = function(event) {
  const delBtn = event.target;

  todoItems.items = todoItems.items.filter(function(obj) {                    // 삭제 버튼을 누른 아이템을 제외하기 위한 filter
    return obj.id !== Number(delBtn.id);
  });

  render();
};

/**
 * 아이템 수정 함수 
 */
 const modifyItem = function(event) {
  const modBtn = event.target;

  todoItems.selectedItem = modBtn.id;                                          // 수정 버튼을 누른 아이템을 selectedItem을 통해 체크
  render();

  const $modifierForm = document.querySelector('form[name="modifierForm"]');  // 수정 form 조회
  $modifierForm.addEventListener('submit', updateItem.bind($modifierForm));

  const $cancelBtn = $modifierForm.querySelector('.cancel');                  // 취소 버튼 조회
  $cancelBtn.addEventListener('click', cancelModifyItem);

  $modifierForm.onkeydown = function(event) {                                 // esc키 누를 시 수정 취소
    if(event.keyCode == 27) {
      cancelModifyItem();
    }
  }
};

/**
 * 아이템 수정 -> 완료 함수
 */
 const updateItem = function(event) {
  event.preventDefault();
  
  const $inputInfo = this.querySelector('input');
  const value = $inputInfo.value.trim();

  if(value.length === 0) {
    $inputInfo.value = "";                                                    // 공백 입력 시 초기화
    return alert('아이템 이름을 입력해주세요!');
  }

  const $obj_id = Number(this.id);
  const idx = todoItems.items.map(obj => obj.id).indexOf($obj_id);            // 해당 id를 가진 객체의 인덱스 조회
  todoItems.items[idx].content = value;
  todoItems.selectedItem = -1;                                                 // 수정이 완료되었기 때문에 수정 form 출력 x

  render();
}

/**
 * 아이템 수정 -> 취소 함수 
 */
const cancelModifyItem = function(event) {
  todoItems.selectedItem = -1;                                                 // 취소 버튼 클릭 시 기존의 화면 유지

  render();
}

/**
 * 아이템 완료 함수 -> 완료 버튼 클릭 시 line-through를 통해 완료 표시
 */
const completeItem = function(event) {
  const btn = event.target;
  const idx = todoItems.items.map(obj => obj.id).indexOf(Number(btn.id));     // 체크된 객체의 인덱스 조회
  todoItems.items[idx].isComplete = !todoItems.items[idx].isComplete;         // 해당 객체의 완료 여부 변경
  
  render();
}

/**
 * 아이템 토글 함수
 */
const checkItem = function(event) {
  const box = event.target;
  const idx = todoItems.items.map(obj => obj.id).indexOf(Number(box.id));     // 체크된 객체의 인덱스 조회
  todoItems.items[idx].highlight = !todoItems.items[idx].highlight;           // 해당 객체의 하이라이트 여부 변경

  render();
}

/**
 * 버튼 handler 등록 함수
 */
function setBtnHandler() {
  const $appenderForm = document.querySelector('form[name="appenderForm"]');  // 랜더링 후 다시 조회
  const $delete = document.querySelectorAll('.delete');                       // 아이템 삭제 버튼 모두 조회
  const $modify = document.querySelectorAll('.modify');                       // 아이템 수정 버튼 모두 조회
  const $complete = document.querySelectorAll('.complete');                   // 아이템 완료 버튼 모두 조회
  const $toggle = document.querySelectorAll('input[type="checkbox"]');        // toggle 체크 박스 모두 조회

  $appenderForm.addEventListener('submit', addItem.bind($appenderForm));      // addItem 함수의 this를 $appenderForm으로 바인딩하여 사용

  $delete.forEach(function(btn) {
    btn.addEventListener('click', deleteItem);
  });

  $modify.forEach(function(btn) {
    btn.addEventListener('click', modifyItem);
  });

  $complete.forEach(function(btn) {
    btn.addEventListener('click', completeItem);
  })

  $toggle.forEach(function(box) {
    box.addEventListener('change', checkItem);
  })
};

function main() {
  render();
}

// 앱 실행
main();