import Component from '../core/Component.js';

export default class TodoAppender extends Component{
    template(){
        return `
            <form name="appenderForm" action="" method="post">
                <fieldset>
                <legend hidden>TodoList Form</legend>
                <label>
                    <span hidden>아이템 추가</span>
                    <input type="text" id="inputTodo" size="40" placeholder="Todo Item 내용을 입력해주세요" autofocus>
                </label>
                <button type="submit">전송</button>
                </fieldset>
            </form>
        `;
    }
    setEvent(){
        const { addTodo } = this.$props;
        // this.$target.addEventListener('submit', addTodo);

        this.addEvent('submit', 'form[name="appenderForm"]', addTodo);

    }

}
