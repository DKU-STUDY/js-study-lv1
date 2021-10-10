import { state } from "./state.js";
import { baseTemplate } from "./template.js";


export const addItem = function (event) {
    event.preventDefault();
    const $app = document.querySelector('#app');
    const $appenderForm = $app.querySelector('form[name="appenderForm"]');
    const content = $appenderForm.querySelector('input').value.trim();
    if (content.length===0){
        return alert("아이템 내용을 입력해주세요.");
    }
    state.todoItems.push({
        id: 4, 
        createdAt: Date.now(),
        content: $appenderForm.querySelector('input').value,
        isComplete: false,
    });
    render();
};
export const editItem = function(event){
    state.selectedItem = Number(event.target.dataset.key); //이벤트가 발생한 태그
    render();
}
export const upDateItem = function (event){
    event.preventDefault();
    const content = event.target.querySelector('input').value.trim();
    if((content.length === 0)){
        return alert("아이템을 입력해주세요");
    }
    state.todoItems[state.selectedItem].content = content;
    state.selectedItem = -1;
    render();
};
export const resetItem = function(event){
    event.preventDefault();
    state.selectedItem = -1;
    render();
}
export const deleteItem = function(event) {
    const key = Number(event.target.dataset.key);
    state.todoItems.splice(key, 1);
    render();
};
export const toggleItem = (event) => {
    const key = Number(event.target.dataset.key);
    const item = state.todoItems[key];
    item.isComplete = !item.isComplete;
    render();
};

export function render () {
    // 렌더링됨
    const $app = document.querySelector('#app');
    $app.innerHTML = baseTemplate();

    // 태그 등록
    const $appenderForm = $app.querySelector('form[name="appenderForm"]');
    const $modifiers = $app.querySelectorAll('.modifier');
    const $deleters = $app.querySelectorAll('.deleter');
    const $modifierForm = $app.querySelector('form[name="modifierForm"]');
    const $complete = $app.querySelectorAll('.complete');

    // 아이템 추가 관리
    $appenderForm.addEventListener('submit', addItem);

    // 아이템 수정 button 관리
    $modifiers.forEach(function ($modifier){
        $modifier.addEventListener('click', editItem);
    })
    // 아이템 수정 관리
    if ($modifierForm) { 
        $modifierForm.addEventListener('submit', upDateItem);
    }
    //아이템 수정 취소, esc키 //
    if ($modifierForm) {
        $modifierForm.addEventListener('reset', resetItem);
        $modifierForm.addEventListener('keydown', (event) => {if(event.code ==='Escape') {state.selectedItem=-1; render();}});
    }
    // 아이템 삭제 관리
    $deleters.forEach(($del) => {
        $del.addEventListener('click', deleteItem);
    });

    // 아이템 토글 관리
    $complete.forEach(($el)=>{
        $el.addEventListener('click', toggleItem);
    });
}