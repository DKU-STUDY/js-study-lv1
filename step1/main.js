
const state = {
    todoItems : [
        {id: 1, content: '첫번째 아이템', isComplete: false, createdAt:Date.now()},
        {id: 2, content: '두번째 아이템', isComplete: false, createdAt:Date.now()},
        {id: 3, content: '세번째 아이템', isComplete: false, createdAt:Date.now()},
    ],
    selectedItem: -1,
}
function template(){
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
            <!-- 완료된 아이템 -->
            ${state.todoItems.map(function (item, key){
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
                    <p> ${item.isComplete ? `style="color: #09F"`:''}
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
            }).join('')}
            <!-- / 완료된 아이템 -->
        </ul>
`
}

function render () {
    // 렌더링됨
    const $app = document.querySelector('#app');
    $app.innerHTML = template();

    // 태그 등록
    const $appenderForm = $app.querySelector('form[name="appenderForm"]');
    const $modifiers = $app.querySelectorAll('.modifier');
    const $deleters = $app.querySelectorAll('.deleter');
    const $modifierForm = $app.querySelector('form[name="modifierForm"]');
    const $complete = $app.querySelectorAll('.complete');

    // 아이템 추가 관리
    const addItem = function (event) {
            event.preventDefault();
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
    $appenderForm.addEventListener('submit', addItem);

    // 아이템 수정 button 관리
    const editItem = function(event){
        state.selectedItem = Number(event.target.dataset.key); //이벤트가 발생한 태그
        render();
    }
    $modifiers.forEach(function ($modifier){
        $modifier.addEventListener('click', editItem);
    })
    // 아이템 수정 관리
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
    if ($modifierForm) { 
        $modifierForm.addEventListener('submit', upDateItem);
    }
    //아이템 수정 취소, esc키 //
    const resetItem = function(event){
        event.preventDefault();
        state.selectedItem = -1;
        render();
    }
    if ($modifierForm) {
        $modifierForm.addEventListener('reset', resetItem);
        $modifierForm.addEventListener('keydown', (event) => {if(event.code ==='Escape') {state.selectedItem=-1; render();}});
    }
    // 아이템 삭제 관리
    const deleteItem = function(event) {
        const key = Number(event.target.dataset.key);
        state.todoItems.splice(key, 1);
        render();
    };
    $deleters.forEach(($del) => {
        $del.addEventListener('click', deleteItem);
    });

    // 아이템 토글 관리
    const toggleItem = (event) => {
        const key = Number(event.target.dataset.key);
        const item = state.todoItems[key];
        item.isComplete = !item.isComplete;
        render();
    };
    $complete.forEach(($el)=>{
        $el.addEventListener('click', toggleItem);
    });
}
function main(){
    render();
}
  // 앱 실행
main();
