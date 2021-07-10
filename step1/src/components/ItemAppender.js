import Component from "../core/Component.js";


export default class ItemAppender extends Component{


    template() {
        return `
            <fieldset>
            <legend hidden>TodoList Form</legend>
            <label>
                <span hidden>아이템 추가</span>
                <input type="text" size="40" class="appender" placeholder="Todo Item 내용을 입력해주세요">
            </label>
            <button type="submit">전송</button>
            </fieldset>
         `
    }
    setEvent() {
        const { addItem } = this.$props;
        this.addEvent("keyup", ".appender", ({key, target}) => {
            if (key !== 'Enter') return;
            checklength(target.value.trim())
            addItem(target.value.trim());
        });
    }
}