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
            onEditMode: this.onEditMode.bind(this)

        });
        new TodoAppender($todoAppender, {
            addTodo: this.addTodo.bind(this)
        });
    }

    // get todoState(){
    //     // const { todoItems } = this.$state;
    //     // return todoItems;

    //     return this.$state;
    // }

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
        event.target.querySelector('input').value = ''; // input text 입력창 초기화
        event.target.querySelector('input').focus();
    }
    
    editTodo(){
        event.preventDefault();
        const content = event.target.querySelector('input').value.trim();
        if(content.length === 0) return alert('Todo Item 내용을 입력해주세요');
        this.$state.todoItems[this.$state.selectedItem].content = content;
        this.$state.selectedItem = -1;
        this.render();

    }


    onEditMode(){
        this.$state.selectedItem = Number(event.target.dataset.key);
        this.render();
        this.$target.querySelector('form[name="modifierForm"] input').focus();
    }

}

new TodoApp(document.querySelector('#app'));
