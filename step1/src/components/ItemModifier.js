import Component from "../core/Component.js";
import { checklength } from "../utils.js";



export default class ItemModifier extends Component{

    template() {
        const { todoItems, selectedItem } = this.$state;
        return todoItems.map(({id,content}) => `
        ${selectedItem === id ? `
        <li>
        <form class="modifier" data-id="${id}"action="">
        <fieldset>
            <legend hidden>아이템 수정</legend>
            <label>
            <span hidden>아이템 수정</span>
            <input type="text" value=${content} size="40">
            </label>
            <button type="submit" class="update">완료</button>
            <button type="button" class="cancel">취소</button>
        </fieldset>
        </form>
        </li>`: ""}`);
    }

    setEvent() {
        const { resetItem, updateItem } = this.$props;
        this.addEvent("keydown", "[data-component='modifierForm']", (event) => {
            if (event.code === 'Escape')
                resetItem();
        });
        this.addEvent("click", ".cancel", () => {
            resetItem();
        });
        this.addEvent("submit", ".modifier" , (event) => {
            event.preventDefault();
            const content = this.$target.querySelector("input").value.trim();
            checklength(content);
            updateItem(content);
        });
    }
}