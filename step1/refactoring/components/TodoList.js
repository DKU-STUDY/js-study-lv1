import Component from '../core/Component.js';

export default class TodoList extends Component{  
    
  template(){
        const { todoItems, selectedItem } = this.$props.todoList;
        
        return `${todoItems.map((todoItem) => {
            if(todoItem.id === selectedItem){
              return `
                <li>
                  <form name="modifierForm" action="" data-idx="${todoItem.id}">
                    <fieldset>
                      <legend hidden>아이템 수정</legend>
                      <label>
                        <span hidden>아이템 수정</span>
                        <input type="text" value="${todoItem.content}" size="40">
                      </label>
                      <button type="submit">완료</button>
                      <button type="button" class="cancelModifier">취소</button>
                    </fieldset>
                  </form>
                </li>
              `;
            }
            return `
              <li>
                <p ${todoItem.isComplete ? 'style="color:#09f;text-decoration-line:line-through"': ''}>
                  <input class="toggle" type="checkbox" ${todoItem.isComplete ? 'checked' : ''} data-idx="${todoItem.id}"/>
                  ${todoItem.content}
                </p>
                <button type="button" class="modifier" data-idx="${todoItem.id}">수정</button>
                <button type="button" class="deleter" data-idx="${todoItem.id}">삭제</button>
              </li>`;
          }).join('')}
          `;
    
    }

    setEvent(){

      const { onEditMode, editTodo, deleteTodo, toggleTodo } = this.$props;

      // 수정 버튼 클릭
      this.addEvent('click', '.modifier', (event) => {
        const idx = event.target.dataset.idx;
        onEditMode(idx);
      });

      // 수정 완료
      this.addEvent('submit', 'form[name="modifierForm"]', editTodo);

      // 수정 모드에서 Esc
      this.addEvent('keyup', 'form[name="modifierForm"]', (event) => {
        if(event.key !== 'Escape') return;
        onEditMode();
      });

      // 수정 모드에서 취소 버튼 클릭
      this.addEvent('click', '.cancelModifier', () => {
        onEditMode();
      });

      // 삭제 버튼 클릭
      this.addEvent('click', '.deleter', deleteTodo);

      // 토글 체크박스 클릭
      this.addEvent('click', '.toggle', toggleTodo);

    //   const $modifiers = this.$target.querySelectorAll('.modifier');
    //   $modifiers.forEach(($modifier) => {
    //     $modifier.addEventListener('click', () => {
    //       const keyNum = Number(event.target.dataset.key);
    //       onEditMode(keyNum);
    //     });
    //   });

    //   const $modifierForm = document.querySelector('form[name="modifierForm"]');
    //   if($modifierForm){
    //     $modifierForm.addEventListener('submit', editTodo);
    //     $modifierForm.addEventListener('keyup', () => {
    //       if(event.key !== 'Escape') return;
    //       onEditMode(-1);
    //     });
    //     $modifierForm.querySelector('.cancelModifier').addEventListener('click', () => {
    //       onEditMode(-1);
    //     });
    //   }
      
    //   const $deleters = document.querySelectorAll('.deleter');
    //   $deleters.forEach(($deleter) => {
    //     $deleter.addEventListener('click', () => {
    //       const keyNum = Number(event.target.dataset.key);
    //       deleteTodo(keyNum);
    //     });
    //   });

    //   const $toggles = document.querySelectorAll('.toggle');
    //   $toggles.forEach(($toggle) => {
    //     $toggle.addEventListener('click', () => {
    //       const keyNum = Number(event.target.dataset.key);
    //       toggleTodo(keyNum);
    //     });
    //   });
    }
}
