import Component from "../core/Component";
import { selectAll,selectOne,checklength } from "../utils";

export default class ItemModifier extends Component{

    template() {
        const { todoItems, selectedItem } = this.$state;
        return todoItems.map(({id,content,isComplete}) => `
        ${selectedItem === id ? `
        <li data-id="${id}">
        <form data-component="modifierForm" action="">
        <fieldset>
            <legend hidden>아이템 수정</legend>
            <label>
            <span hidden>아이템 수정</span>
            <input type="text" value=${content} size="40">
            </label>
            <button type="button" class="update">완료</button>
            <button type="button" class="cancel">취소</button>
        </fieldset>
        </form>
        </li>`: ""}`);
    }

    setEvent() {
        const { resetItem, updateItem } = this.$props;
        const {selectedItem} = this.$state;
        this.addEvent("keydown", "[data-component='modifierForm']", (event) => {
            if (event.code === 'Escape')
                resetItem();
        });
        this.addEvent("click", ".cancel", () => {
            resetItem();
        });
        this.addEvent("submit", "[data-component='modifierForm']", (event) => {
            event.preventDefault();
            const content = event.target.querySelector("input").value.trim();
            checklength(content);
            updateItem(content);
        });
    }
}