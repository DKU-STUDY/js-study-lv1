import {state} from "./state.js";
import {selectAll, selectOne, checklength } from "./utils.js"
import {template } from "./template.js";


const $app = selectOne("#app");
const $appenderForm = selectOne('form[name="appenderForm"]', $app);
const $modifiers = selectAll('.modifier', $app);
const $modifierForm = selectOne('form[name="modifierForm"]', $app);
const $deleters = selectAll(".deleter", $app);
const $complete = selectAll(".complete", $app);
const $cancellers = selectAll(".cancel", $app);

//이벤트 등록



const itemAdd = function (event) {

    event
        .preventDefault();
    const content = selectOne('input', $appenderForm)
        .value
        .trim();
    checklength(content);

    state.todoItems.push({
        createdAt: Date.now(),
        content: content,
        isComplete: false
    });
    render();
}
const editItem = function (event) {
    state
        .selectedItem = Number(event.target.dataset.key);
    render();
  }
  //아이템 수정
const updateItem = function (event) {
    event.preventDefault();
    const content = selectOne('input', $modifierForm)
        .value
        .trim();
    checklength(content);
    state
        .todoItems[state.selectedItem]
        .content = content;
    state
        .selectedItem = -1;
    render();
  }
  //아이템 수정 취소, esc키 //
const resetItem = function(event){
    event
        .preventDefault();
    state
        .selectedItem = -1;
    
    render();
  }
  //아이템 삭제 관리//
const deleteItem = function (event) {
    const key = Number(event.target.dataset.key);
    state
        .todoItems
        .splice(key, 1);
    render();
  }    
  
const toggleItem = function (event) {
    const key = Number(event.target.dataset.key);
    const item = state
        .todoItems[key];
    item
        .isComplete = !item
            .isComplete;
    render();
}
export function render() {
   
    $app.innerHTML = template();

    
    $appenderForm
        .addEventListener('submit', itemAdd);
    
    
    $modifiers
        .forEach(($modifier) => $modifier
            .addEventListener("click", editItem));
    
  
    if ($modifierForm) {
        $modifierForm
            .addEventListener('submit', updateItem);
        $modifierForm.
            addEventListener('reset', resetItem);
        $modifierForm
            .addEventListener('keydown', (event) => { if (event.code === 'Escape') { state.selectedItem = -1; render(); } });
    }
  
    
    $cancellers
        .forEach(($canceller) => $canceller
            .addEventListener("click", resetItem));
    
   
    $deleters
        .forEach(($deleter) => $deleter
            .addEventListener("click", deleteItem));

    
    $complete
        .forEach(($el) => $el
            .addEventListener("click", toggleItem));
    
}
