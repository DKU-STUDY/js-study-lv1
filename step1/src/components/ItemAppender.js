import Component from "../core/Component";

export default class ItemAppender extends Component{

    template() {
        return ` <form data-component="appenderForm" action="" method="post">
        <fieldset>
        <legend hidden>TodoList Form</legend>
        <label>
            <span hidden>아이템 추가</span>
            <input type="text" size="40" placeholder="Todo Item 내용을 입력해주세요">
        </label>
        <button type="submit">전송</button>
        </fieldset>
         </form>`
    }
    setEvent() {
        const { addItem } = this.$props;
        this.addEvent("submit", ".appenderForm", )
    }
}