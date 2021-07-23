// entry file
import Component from './core/Component.js';
import TodoList from './components/TodoList.js';
import TodoAppender from './components/TodoAppender.js';

class TodoApp extends Component{
    
    // constructor(){
    //     super(...arguments); //...arguments 의 뜻 ?
    //     const $todoList = this.$target.querySelector('.todo-list');
    //     this.todolist = new TodoList($todoList, {
    //         todoList: this.$state
    //     });
    //     const $todoAppender = this.$target.querySelector('.todo-appender');
    //     this.todoappender = new TodoAppender($todoAppender, {
    //         addTodo: this.addTodo
    //     });
    // }

    setup(){
        this.$state = {
            todoItems: [
                { id: 1, content: '1번 투두', isComplete: false, createdAt: Date.now() },
                { id: 2, content: '2번 투두', isComplete: false, createdAt: Date.now() },
                { id: 3, content: '3번 투두', isComplete: false, createdAt: Date.now() }
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
        // 어떤 자식을 만들지 / target을 자동으로 넘겨주는 작업
        // 아예 자식 컴포넌트를 만드는 작업을 mounted가 아닌 다른 곳에서 해서 한번만 실행될 수 있도록 해주는 건 어떨까
        
        // const obj = {
        //     todolist: TodoList,
        // };
        
        // const $todoList = this.$target.querySelector('.todo-list');
        // new obj.todolist($todoList);
        // this.initChildren();
    }

    initChildren(){
        const $todoList = this.$target.querySelector('.todo-list');
        new TodoList($todoList, {
            todoList: this.$state
        });
        const $todoAppender = this.$target.querySelector('.todo-appender');
        new TodoAppender($todoAppender, {
            addTodo: this.addTodo
        });
    }

    /**
     * 기존의 코드는 state가 바뀌면 render 가 실행되고 이 과정에서 mounted도 실행되면서 TodoAppender, TodoList 객체를 또 새로 만들어 바뀐 투두리스트를 보여주는 방식이었다.
     * 여기서 TodoAppender나 TodoList 객체가 계속 생성되지 않게 하면서 투두리스트를 부분적으로 업데이트 할 수 있는 방법은 없을까? 
     * 
     */

    addTodo = (event) => {
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

    // setState(component, newState){
    //     this.$state = {...this.$state, ...newState};
    //     this[component].setState(this.$state);
    // }

};


new TodoApp(document.querySelector('#app'));
