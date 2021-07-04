import { Component } from "../core/Component.js";

export class Item extends Component {

    constructor($target) {
        super($target);
    }

    init() {
        this.$state = {
            items: [],
            selectedItem: -1,
        };
    }

    itemTemplate({id, content, highlight, isComplete}) {
        return `
            <li>
                ${this.$state.selectedItem === id ? `
                    <form name="modifierForm" action="" id="${id}">
                        <fieldset>
                            <legend hidden>아이템 수정</legend>
                            <label>
                                <span hidden>아이템 수정</span>
                                <input type="text" value="${content}" size="40">
                            </label>
                                <button type="submit">완료</button>
                                <button type="button" class="cancel">취소</button>
                        </fieldset>
                    </form>   
            `   :   `
                    <p ${highlight ? 'style="color:#09F"' : ''} ${isComplete ? 'class="finish"' : ''}>
                        <input type="checkbox" id="${id}" ${highlight ? ' checked' : ''}>
                        ${content}
                    </p>
                    <button type="button" class="complete" id="${id}">완료</button>
                    <button type="button" class="modify" id="${id}">수정</button>
                    <button type="button" class="delete" id="${id}">삭제</button>
                `}
            </li>
        `
    }

    template() {
        return `
            <h1>📃 TodoList</h1>
                <form name="appenderForm" action="" method="post">
                  <fieldset>
                    <legend hidden>TodoList Form</legend>
                    <label>
                      <span hidden>아이템 추가</span>
                      <input type="text" size="40" placeholder="Todo Item 내용을 입력해주세요">
                    </label>
                    <button type="submit">전송</button>
                  </fieldset>
                </form>
            <ul>
                ${this.$state.items.map(this.itemTemplate.bind(this)).join('')}
            </ul>
          `
    }

    addItem(event) {
        event.preventDefault();
        const $inputInfo = event.target.querySelector('input');
        const value = $inputInfo.value.trim();

        if(value.length === 0) {
            $inputInfo.value = "";
            $inputInfo.focus();
            return alert('아이템 이름을 입력해주세요!');
        }

        const obj = {
            id: this.$state.items.length + 1,
            content: $inputInfo.value,
            highlight: false,
            isComplete: false,
            createdAt: Date.now()
        };

        this.setState({
            items: [ ...this.$state.items, obj],
            selectedItem: this.$state.selectedItem
        });
    }

    deleteItem(event) {
        const delBtn = event.target;

        const items = this.$state.items.filter(function(obj) {
            return obj.id !== Number(delBtn.id);
        });

        this.setState({
            items,
            selectedItem: this.$state.selectedItem
        });
    }

    modifyItem(event) {
        const modBtn = event.target;

        this.$state.selectedItem = Number(modBtn.id);
        this.render();

        const $modifierForm = document.querySelector('form[name="modifierForm"]');
        $modifierForm.addEventListener('submit', this.updateItem.bind(this));

        const $cancelBtn = $modifierForm.querySelector('.cancel');
        $cancelBtn.addEventListener('click', this.cancelModifyItem.bind(this));

        $modifierForm.onkeydown = function(event) {
            if(event.keyCode == 27) {
                this.cancelModifyItem.bind(this)();
            }
        }.bind(this);
    }

    updateItem(event) {
        event.preventDefault();

        const $inputInfo = event.target.querySelector('input');
        const value = $inputInfo.value.trim();

        if (value.length === 0) {
            $inputInfo.value = "";
            return alert('아이템 이름을 입력해주세요!');
        }

        const $obj_id = Number(event.target.id);
        const idx = this.$state.items.map(obj => obj.id).indexOf($obj_id);
        this.$state.items[idx].content = value;
        this.$state.selectedItem = -1;

        this.setState({
            items: [ ...this.$state.items ],
            selectedItem: this.$state.selectedItem
        });
    }

    cancelModifyItem() {
        this.$state.selectedItem = -1;
        this.render();
    }

    completeItem(event) {
        const btn = event.target;
        const idx = this.$state.items.map(obj => obj.id).indexOf(Number(btn.id));
        this.$state.items[idx].isComplete = !this.$state.items[idx].isComplete;

        this.setState({
            items: [ ...this.$state.items ],
            selectedItem: this.$state.selectedItem
        });
    }

    toggleItem(event) {
        const box = event.target;
        const idx = this.$state.items.map(obj => obj.id).indexOf(Number(box.id));
        this.$state.items[idx].highlight = !this.$state.items[idx].highlight;

        this.setState({
            items: [ ...this.$state.items ],
            selectedItem: this.$state.selectedItem
        });
    }

    setBtnHandler() {
        const $appenderForm = document.querySelector('form[name="appenderForm"]');
        const $delete = document.querySelectorAll('.delete');
        const $modify = document.querySelectorAll('.modify');
        const $complete = document.querySelectorAll('.complete');
        const $toggle = document.querySelectorAll('input[type="checkbox"]');

        $appenderForm.addEventListener('submit', this.addItem.bind(this));

        $delete.forEach(function(btn) {
            btn.addEventListener('click', this.deleteItem.bind(this));
        }.bind(this));

        $modify.forEach(function(btn) {
            btn.addEventListener('click', this.modifyItem.bind(this));
        }.bind(this));

        $complete.forEach(function(btn) {
            btn.addEventListener('click', this.completeItem.bind(this));
        }.bind(this))

        $toggle.forEach(function(box) {
            box.addEventListener('change', this.toggleItem.bind(this));
        }.bind(this))
    }
}