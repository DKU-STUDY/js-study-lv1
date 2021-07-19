//import { addItem, upDateItem, resetItem, toggleItem, deleteItem, editItem } from "./service.js";
//import { baseTemplate, itemTemplate } from "./template.js";
import {render} from "./service.js"
// webpack - bundler - 58분 가량에서 설치 안내
/* state
const state = {
    todoItems : [
        {id: 1, content: '첫번째 아이템', isComplete: false, createdAt:Date.now()},
        {id: 2, content: '두번째 아이템', isComplete: false, createdAt:Date.now()},
        {id: 3, content: '세번째 아이템', isComplete: false, createdAt:Date.now()},
    ],
    selectedItem: -1,
}
*/
/* baseTemplate
const baseTemplate = () => 
`
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
            ${state.todoItems.map(itemTemplate).join('')}
            <!-- / 완료된 아이템 -->
        </ul>
`;
*/
/* 위의 baseTemplate과 동일한 역할 
function baseTemplate(){
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
            ${state.todoItems.map(itemTemplate).join('')}
            <!-- / 완료된 아이템 -->
        </ul>
    `
}
*/
//const template = (item, key) => `hello`;
//const template = function(item, key) {return '안녕하세요.'};

/*itemTemplate
const itemTemplate = (item, key) => 
`<li>
    ${ key === state.selectedItem ? `
        <form name="modifierForm" action="">
            <fieldset>
                <legend hidden>아이템 수정</legend>
                <label>
                    <span hidden>아이템 수정</span>
                    <input type="text" value="${item.content}" size="40">
                </label>
                <button type="submit">완료</button>
                <button type="button" class="cancel">취소</button>
            </fieldset>
        </form>
    ` : `
        <p> ${item.isComplete ? 'style="color: #09F"':''}
            <input 
                type="checkbox"
                class="complete" 
                data-key="${key}"
                ${item.isComplete?'checked':''} 
            />
            ${item.content} 
            </p>
            <button type ="button">취소</button>
            <button type="button" class="modifier" data-key="${key}">수정</button>
            <button type="button" class="deleter" data-key="${key}">삭제</button>
    `}
    
</li>`;
*/

/* 백틱, ${}: 템플릿 리터럴
const a = 10; const b = 5;
`${`a + b = ${a + b + `${`a + b = ${a + b}`}`}`
*/
/* 위의 itemTemplate과 동일한 역할 
function itemTemplate (item,key) {
    if(key === state.selectedItem){
        return `
            <!-- 수정 중인 아이템 -->
            <li>
                <form name="modifierForm" action="">
                    <fieldset>
                        <legend hidden>아이템 수정</legend>
                        <label>
                            <span hidden>아이템 수정</span>
                            <input type="text" value="${item.content}" size="40">
                        </label>
                        <button type="submit">완료</button>
                        <button type="button" class="cancel">취소</button>
                    </fieldset>
                </form>
            </li>
            <!-- / 수정 중인 아이템 -->`;
    }
    return `
    <li>
        <p> ${item.isComplete ? style="color:blue":''}
        <input 
            type="checkbox"
            class="complete" 
            data-key="${key}"
            ${item.isComplete?'checked':''} 
        />
        ${item.content} 
        </p>
        <button type ="button">취소</button>
        <button type="button" class="modifier" data-key="${key}">수정</button>
        <button type="button" class="deleter" data-key="${key}">삭제</button>
    </li>
    `;
}
*/


// 밖으로 함수들을 빼주는 것이 추후 프로그램이 커지게 됐을 때, 더 좋다.
/* item functions
const addItem = function (event) {
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
const editItem = function(event){
    state.selectedItem = Number(event.target.dataset.key); //이벤트가 발생한 태그
    render();
}
const upDateItem = function (event){
    event.preventDefault();
    const content = event.target.querySelector('input').value.trim();
    if((content.length === 0)){
        return alert("아이템을 입력해주세요");
    }
    state.todoItems[state.selectedItem].content = content;
    state.selectedItem = -1;
    render();
};
const resetItem = function(event){
    event.preventDefault();
    state.selectedItem = -1;
    render();
}
const deleteItem = function(event) {
    const key = Number(event.target.dataset.key);
    state.todoItems.splice(key, 1);
    render();
};
const toggleItem = (event) => {
    const key = Number(event.target.dataset.key);
    const item = state.todoItems[key];
    item.isComplete = !item.isComplete;
    render();
};
*/
/* render
function render () {
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
*/
/* render함수의 간결화
function render () {
    // 렌더링됨
    const $app = document.querySelector('#app');
    $app.innerHTML = baseTemplate();

    // 태그 등록
    // 아이템 추가 관리
    $app.querySelector('form[name="appenderForm"]')
        .addEventListener('submit', addItem);
    // 아이템 수정 관리
    $app.querySelectorAll('.modifier')
        .forEach(function ($modifier){
            $modifier.addEventListener('click', editItem);
        })
    // 아이템 삭제 관리
    $app.querySelectorAll('.deleter')
        .forEach(($del) => {
            $del.addEventListener('click', deleteItem);
        });
    // 아이템 수정 관리
    const $modifierForm = $app.querySelector('form[name="modifierForm"]');
    if ($modifierForm) { 
        $modifierForm.addEventListener('submit', upDateItem);
        //$app.querySelector('form[name="modifierForm"]')?.addEventListener('submit', upDateItem);
    }
    if ($modifierForm) {  //아이템 수정 취소, esc키 
        $modifierForm.addEventListener('reset', resetItem);
        $modifierForm.addEventListener('keydown', (event) => {if(event.code ==='Escape') {state.selectedItem=-1; render();}});
    }
    // 아이템 토글 관리
    $app.querySelectorAll('.complete')
        .forEach(($el)=>{
            $el.addEventListener('click', toggleItem);
        });   
}
*/


function main(){
    render();
}
  // 앱 실행
main();
