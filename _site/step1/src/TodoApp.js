import Component from './Component.js';
import TodoList from './TodoList.js';
import TodoAppender from './TodoAppender.js';

class TodoApp extends Component{
    setup(){
        this.$state = {
            todoItems: [
                { id: 1, content: '첫 번째 투두', isComplete: false, createdAt: Date.now() },
                { id: 2, content: '두 번째 투두', isComplete: false, createdAt: Date.now() },
                { id: 3, content: '세 번째 투두', isComplete: false, createdAt: Date.now() },
              ],
              selectedItem: -1
        }
    }
    template(){
        return `
            <h1>📃 TodoList</h1>
            <div class="todo-appender"></div>
            <ul class="todo-list"></ul>
        `;
    }
    mounted(){
        const $todolist = this.$target.querySelector('.todo-list');
        const $todoAppender = this.$target.querySelector('.todo-appender');
        const $todoModifier = this.$target.querySelector('form[name="modifierForm"]');

        new TodoList($todolist, {
            todoList: this.$state,
            editTodo: this.editTodo.bind(this),
            onEditMode: this.onEditMode.bind(this),
            deleteTodo: this.deleteTodo.bind(this),
            toggleTodo: this.toggleTodo.bind(this)

        });
        new TodoAppender($todoAppender, {
            addTodo: this.addTodo.bind(this)
        });
    }

    addTodo(){
        event.preventDefault();
        const content = event.target.querySelector('input').value.trim();
        if(content.length === 0) return alert('Todo Item 내용을 입력해주세요');
        const newItem = {
            id: 4,
            createdAt: Date.now(),
            content: content,
            isComplete: false,
        }
        this.setState({ todoItems: [...this.$state.todoItems, newItem]});
        event.target.querySelector('input').value = '';
        event.target.querySelector('input').focus();
    }
    
    editTodo(){
        event.preventDefault();
        const content = event.target.querySelector('input').value.trim();
        if(content.length === 0) return alert('Todo Item 내용을 입력해주세요');
        const newState = this.$state;
        newState.todoItems[newState.selectedItem].content = content;
        newState.selectedItem = -1;
        this.setState(newState);
    }

    onEditMode(keyNum){
        this.$state.selectedItem = keyNum;
        this.render();

        const $modifierForm = this.$target.querySelector('form[name="modifierForm"] input');
        if($modifierForm) $modifierForm.focus();
    }

    deleteTodo(keyNum){
        const { todoItems } = this.$state
        todoItems.splice(keyNum, 1);
        this.setState({ todoItems });
    }

    toggleTodo(keyNum){
        const { todoItems } = this.$state;
        todoItems[keyNum].isComplete = !todoItems[keyNum].isComplete;
        this.setState({ todoItems });
    }

}

new TodoApp(document.querySelector('#app'));
