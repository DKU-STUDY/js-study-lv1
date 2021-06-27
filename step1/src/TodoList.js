import Component from './Component.js';

export default class TodoList extends Component{
    
    template(){
        const { todoItems, selectedItem } = this.$props.todoList;
        
        // const { todoItems, selectedItem } = this.$state;
        return `${todoItems.map((todoItem, key) => {
            if(key === selectedItem){
              return `
                <li>
                  <form name="modifierForm" action="">
                    <fieldset>
                      <legend hidden>아이템 수정</legend>
                      <label>
                        <span hidden>아이템 수정</span>
                        <input type="text" value="${todoItem.content}" size="40">
                      </label>
                      <button type="submit">완료</button>
                      <button type="button" class="cancelEditBtn">취소</button>
                    </fieldset>
                  </form>
                </li>
              `;
            }
            return `
              <li>
                <p ${todoItem.isComplete ? 'style="color:#09f;text-decoration-line:line-through"': ''}>
                  <input class="complete" type="checkbox" ${todoItem.isComplete ? 'checked' : ''} data-key="${key}"/>
                  ${todoItem.content}
                </p>
                <button type="button">완료</button>
                <button type="button" class="modifier" data-key="${key}">수정</button>
                <button type="button" class="deleter" data-key="${key}">삭제</button>
              </li>`;
          }).join('')}
          `;
    
    }
    setEvent(){
      const { editTodo, onEditMode } = this.$props;

      this.$target.addEventListener('click', () => {
        if(event.target.classList.contains('modifier')){
          const $modifiers = this.$target.querySelectorAll('.modifier');
          $modifiers.forEach(($modifier) => {
            $modifier.addEventListener('click', onEditMode);
          });
        }
      });

      this.$target.addEventListener('submit', editTodo);

    }
}