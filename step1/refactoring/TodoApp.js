// entry file
import Component from './core/Component.js';
import TodoList from './components/TodoList.js';
import TodoAppender from './components/TodoAppender.js';
import { newGuid } from './utils/randomId.js';
import { copyObj } from './utils/copyObj.js';

class TodoApp extends Component{

    setup(){
        this.$state = {
            todoItems: [
                { id: newGuid(), content: '1번 투두', isComplete: false, createdAt: Date.now() },
                { id: newGuid(), content: '2번 투두', isComplete: false, createdAt: Date.now() },
                { id: newGuid(), content: '3번 투두', isComplete: false, createdAt: Date.now() }
            ],
            selectedItem: -1
        };
    }

    template(){
        return `
            <h1>📃 TodoList</h1>
            <div class="todo-appender"></div>
            <ul class="todo-list"></ul>
        `;
    }

    mounted(){

        const compObj = [
            {
                selector: '.todo-appender',
                component: TodoAppender,
                props: {
                    addTodo: this.addTodo.bind(this),
                },
            },
            {
                selector: '.todo-list',
                component: TodoList,
                props: {
                    todoList: this.$state,
                    onEditMode: this.onEditMode.bind(this),
                    editTodo: this.editTodo.bind(this),
                    deleteTodo: this.deleteTodo.bind(this),
                    toggleTodo: this.toggleTodo.bind(this),
                }
                
            },
        ];

        compObj.forEach((obj) => {
            this.initChildren(obj.selector, obj.component, obj.props);
        });

    }

    addTodo(event){
        event.preventDefault();
        const content = event.target.querySelector('input').value.trim();
        if(content.length === 0) return alert('Todo Item 내용을 입력해주세요');
        const id = newGuid();
        const newItem = {
            id,
            createdAt: Date.now(),
            content: content,
            isComplete: false,
        };
        this.setState({ todoItems: [...this.$state.todoItems, newItem]});
        document.querySelector('#inputTodo').focus();
    }

    onEditMode(idx = -1){
        this.setState({
            todoItems: [...this.$state.todoItems],
            selectedItem: idx
        });

        const $modifierForm = this.$target.querySelector('form[name="modifierForm"] input');
        if($modifierForm) $modifierForm.focus();
    }

    editTodo(event){
        event.preventDefault();
        const content = event.target.querySelector('input').value.trim();
        if(content.length === 0) return alert('Todo Item 내용을 입력해주세요');

        const newState = copyObj(this.$state); // $state의 현재 상태 복사

        const foundIndex = this.findItemByIdx(newState, event.target.dataset.idx);
        newState.todoItems[foundIndex].content = content;
        newState.selectedItem = -1;

        this.setState(newState);
    }

    deleteTodo(event){
        const newState = copyObj(this.$state);

        const foundIndex = this.findItemByIdx(newState, event.target.dataset.idx);
        newState.todoItems.splice(foundIndex, 1);

        this.setState(newState);
    }

    toggleTodo(event){
        const newState = copyObj(this.$state);
        
        const foundIndex = this.findItemByIdx(newState, event.target.dataset.idx);
        newState.todoItems[foundIndex].isComplete = !newState.todoItems[foundIndex].isComplete;
        
        this.setState(newState);
    }

    // utils 중복 줄여주기 위함
    findItemByIdx(targetObj, idx){
        return targetObj.todoItems.findIndex(item => item.id === idx);
    }

};

new TodoApp(document.querySelector('#app'));
