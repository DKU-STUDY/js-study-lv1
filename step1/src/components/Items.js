import Component from "../core/Component";
import { selectAll,selectOne,checklength } from "../utils";

export default class Items extends Component{
    setup() {
        this.$state = {
            todoItems: [],
            selectedItem: -1,
        };
    }
    template() {
        return `
        <p data-component="itmes" ${item.isComplete ? ' style="color: #09F"' : ''}>
        <input type="checkbox"  data-key="${key}" ${item.isComplete ? `checked ` : ``}/>
        ${item.content}</p>
        <button type="button">취소</button>
        <button type="button" class="modifier" data-key="${key}">수정</button>
        <button type="button" class="deleter"  data-key="${key}">삭제</button>`
    }
    
    setEvent() {
        this.$target.addEventListener('click', ({ target }) => {
            
            const todoItems = [...this.$state.todoItems];
            const selectedItem = this.$state.selectedItem;
            const key = Number(target.dataset.key);
            if (target.classList.contains('modifiers')) {
                selectedItem = key;
                this.setState({ selectedItem });
            }
            if (target.classList.contains('cancel')) {
                selectedItem = -1;
                this.setState({ selectedItem });
            }
            if (target.classList.contains('deleter')) {
                todoItems
                    .splice(key, 1);
                this.setState({ todoItems });
            }
            if (target.classList.contains('complete')) {
                const item = todoItems[key];
                item
                    .isComplete = !item
                        .isComplete;
                this.setState({ todoItems });
            }


        });
        this.$target.addEventListener("submit", (event) => {
            const { todoItems, selectedItem } = this.$state;
            const todoItems = [...this.$state.todoItems];
            if (target.classList.contains('appenderForm')) {
                event.preventDefault();
                const content = selectOne('input', $appenderForm).value.trim();
                checklength(content);
        
                todoItems.push({
                    id = Math.max(0,...todoItems.map(v=v.seq))+1,
                    createdAt: Date.now(),
                    content: content,
                    isComplete: false
                });
                render();
            }
            if (target.classLis.contains(`modifierForm`)) {
                event.preventDefault();
                const content = selectOne('input', $modifierForm)
                    .value
                    .trim();
                checklength(content);
                todoItems[selectedItem]
                    .content = content;
                selectedItem = -1;
                render();
            }
            
        });
        this.$target.addEventListener('keydown', (event) => {
            const { todoItems, selectedItem } = this.$state;
            if (target.classList.contains(modifierForm)) {
                event
                    .preventDefault();
                selectedItem = -1;
                render();
            }
        });
    }
        
}
