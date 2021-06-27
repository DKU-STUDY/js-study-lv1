const state = {
  todoItems: [],
  selectedItem: -1
};

let id = 4;

function template(){
  return /*html*/ `
  <main id="app">
    <h1>📃 TodoList</h1>
    <form name="appenderForm" action="">
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
      <!-- 완료된 아이템 -->
      ${state.todoItems
        .map(function(item, key) {
          if (key === state.selectedItem) {
            return /*html*/ `
            <!-- 수정 중인 아이템 -->
            <li>
              <form name="modifierForm" action="">
                <fieldset>
                  <legend hidden>아이템 수정</legend>
                  <label>
                    <span hidden>아이템 수정</span>
                    <input type="text" value="${item.content}" size="40">
                  </label>
                  <button type="submit">완료</button>
                  <button type="button" class="canceler">취소</button>
                </fieldset>
              </form >
            </li>
            <!-- / 수정 중인 아이템 -->
            `;
          }
          return /*html*/ `
            <li>
            
              <p ${item.isComplete ? 'style="color: #09F"' : ''}>${item.content}</p>
              <input 
              type="checkbox" 
              class="complete" 
              ${item.isComplete ? 'checked' : ''}
              data-key = "${key}"
              />
              <button type="button" class="modifier" data-key="${key}">수정</button>
              <button type="button" class="deleter" data-key="${key}">삭제</button>
            </li>
         `;
        })
        .join('')}
        <!-- / 완료된 아이템 -->
        </ul>
      </main>
      `;
    };    

    /**
     * 앱 시작시 실행될 entry 함수
     */

    // 입력한 값이 공백인지 체크하는 함수
    function cheklength(content){
      if (!content) {
        return alert('아이템 내용을 입력해주세요');
      }
    }

    function render(){
      const $app = document.querySelector('#app');
      $app.innerHTML = template();
    
      // 태그 등록
      const $appenderForm = $app.querySelector('form[name="appenderForm"]');
      const $modifiers = $app.querySelectorAll('.modifier');
      const $cancelers = $app.querySelectorAll('.canceler');
      const $deleter = $app.querySelectorAll('.deleter');
      const $modifierForm = $app.querySelector('form[name="modifierForm"]');
      const $complete = $app.querySelectorAll('.complete');

      /** 이벤트 등록 */
    
      // Item 추가 관리
      const addItem = function(event) {
        event.preventDefault();
        const content = $appenderForm.querySelector('input').value.trim();
        cheklength(content);
    
        state.todoItems.push({
          id: id++,
          createAt: Date.now(),
          content: $appenderForm.querySelector('input').value,
          isComplete: false
          
        });
        render();
        console.log(state.todoItems);
      };
      $appenderForm.addEventListener('submit', addItem);

      // Item 수정 버튼 관리
      const editItem = function(event) {
        state.selectedItem = Number(event.target.dataset.key);
        render();
      };
      $modifiers.forEach(function($modifier) {
        $modifier.addEventListener('click', editItem);
      });

      // Item 수정 중 취소 버튼 관리
      const cancelUpdated = function() {
        state.selectedItem = -1;
        render();
      };
      $cancelers.forEach(function($canceler){
        $canceler.addEventListener('click', cancelUpdated);
      });
      // 추가: esc 눌렀을 때 수정 취소
      function cancel_esc(){
        if (event.keyCode == 27 && state.selectedItem != -1) { cancelUpdated(); }
      }
      document.addEventListener('keydown', cancel_esc);

      // Item 수정 관리
      const updateItem = function(event) {
        event.preventDefault();
        const content = event.target.querySelector('input').value.trim();
        cheklength(content);

        state.todoItems[state.selectedItem].content = content;
        state.selectedItem = -1;
        render();
      };
      if ($modifierForm) { // * 이 태그가 없을 때를 고려
        $modifierForm.addEventListener('submit', updateItem);
      }
    
      // Item 삭제 관리
      const deleteItem = function(event) {
        const key = Number(event.target.dataset.key);
        state.todoItems.splice(key, 1);
        render();
      };
      $deleter.forEach(function($el){
        $el.addEventListener('click', deleteItem);
      });
    
      // Item 토글 관리
      const toggleItem = function(event) {
        const key = Number(event.target.dataset.key);
        const item = state.todoItems[key];
        item.isComplete = !item.isComplete;
        render();
      };
      $complete.forEach(function($el){
        $el.addEventListener('click', toggleItem);
      });
    };

    function main(){
      render();
    };

    main();