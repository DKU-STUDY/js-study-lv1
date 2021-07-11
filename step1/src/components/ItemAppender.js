import Component from "../core/Component.js";
import { checklength } from "../utils.js";


export default class ItemAppender extends Component{


    template() {
        return `
            <form class="appender" action="" method="post">
                <fieldset>
                <legend hidden>TodoList Form</legend>
                <label>
                    <span hidden>아이템 추가</span>
                    <input type="text" size="40"  placeholder="Todo Item 내용을 입력해주세요">
                </label>
                <button type="submit">전송</button>
                </fieldset>
            </form>
         `
    }
    setEvent() {
        const { addItem } = this.$props;
        this.addEvent("submit", ".appender", (event) => {
            event.preventDefault();
            const content = this.$target.querySelector("input").value.trim();
            checklength(content);
            addItem(content);
        });
    }
}