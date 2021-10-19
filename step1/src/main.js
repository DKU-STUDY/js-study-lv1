// 코드 작성

/**  1. 이벤트에 대한 함수 추가 **/
// (1) 태그 추가 함수
function appendItem (event) {
    
    event.preventDefault(); // handAppendItemButton

    const $appender = $appenderForm.querySelector('input');

    const $newItem = document.createElement('li');
    
    // 태그에 내용 채우기
    if($appender.value){
        $newItem.innerHTML = `
        <input class="check" type="checkbox" style="margin-right:15px">
        <p>
            ${$appender.value}
        </p>
        <button class="complete" type="button">완료</button>
        <button class="update" type="button">수정</button>
        <button class="remove" type="button">삭제</button>
        `;
        $todoList.appendChild($newItem);
        $appender.value = "";
        $appender.focus();

        // 추가한 아이템 버튼 이벤트 등록
        /* document.addEventListener('click', newItemEvent);
        function newItemEvent (event) {
            switch (event.target.getAttribute("class")){
                case "complete":
                    toggleItem(event);
                    break;
                case "check":
                    toggleItem(event);
                    break;
                case "update":
                    editItem(event);
                    break;
                case "remove":
                    removeItem(event);
                    break;
                default: break;
            }
        } */

        $newItem.querySelector('.remove').onclick = removeItem;
        $newItem.querySelector('.complete').onclick = toggleItem;
        $newItem.querySelector('.check').onclick = toggleItem;
        $newItem.querySelector('.update').onclick = editItem;
    }
    else{alert("아이템 이름을 입력해주세요.")};
}


// (2) 태그 삭제 함수
function removeItem (event) {
    event.target.parentNode.remove();
}


// (3) 아이템 토글 함수
function toggleItem (event) {

    const $content = event.target.parentNode.querySelector('p');
    const $parent = event.target.parentNode;
    let completed = '';
    let isChecked = null;
    

    // 체크박스-버튼 동기화
    // 버튼 눌렀을 때
    if(event.target.getAttribute('type') === "button"){
        completed = event.target.innerHTML === '취소';
        
        isChecked = completed ? false : true; 
        $content.style.color = completed ? '' : '#09F';
        event.target.innerHTML = completed ? '완료' : '취소';
        $parent.querySelector('.check').checked = isChecked;
    }
    // 체크박스 눌렀을 때
    else {
        isChecked = event.target.checked === false;
        completed = isChecked ? true : false;
        $content.style.color = completed ? '' : '#09F';

        $parent.querySelector('.complete').innerHTML = completed ? '완료' : '취소';
    }
    
}


// (4) 아이템 수정 전환 함수
function editItem (event) {

    const $parent = event.target.parentNode;
    const originHTML = $parent.innerHTML;
    console.log(originHTML);

    $parent.innerHTML = `
        <form name="modifierForm" action="">
            <fieldset>
                <legend hidden>아이템 수정</legend>
                <label>
                    <span hidden>아이템 수정</span>
                    <input type="text" value="${$parent.querySelector('p').innerHTML.trim()}" size="40">
                </label>
                <button type="submit">완료</button>
                <button class="cancel" type="button">취소</button>
            </fieldset>
        </form>
    `;

    function registerEvent () {
        
        $parent.querySelectorAll('.update').forEach(function($update){
            $update.onclick = editItem;
        })
        $parent.querySelectorAll('.remove').forEach(function($remove){
            $remove.onclick = removeItem;
        })
        $parent.querySelectorAll('.complete').forEach(function($complete){
            $complete.onclick = toggleItem;
        })
    }

    $parent.querySelector('.cancel').onclick = function () {
        $parent.innerHTML = originHTML;
        registerEvent();
    }

    // esc 누르면 취소
    document.addEventListener("keyup", pressESC);
    function pressESC (event) {
        if (event.key === "Escape"){
            $parent.innerHTML = originHTML;
           registerEvent();
        }
    }

    const $editForm = $parent.querySelector('form');
    $editForm.onsubmit = function (event) {
        event.preventDefault();
        const newContent = $editForm.querySelector('input').value;
        $parent.innerHTML = originHTML;
        $parent.querySelector('p').innerHTML = newContent;
        registerEvent();
    }

}


/** 2. DOM 접근 **/ 
const $appenderForm = document.forms.appenderForm;
const $todoList = document.querySelector('#todoList');




/** 3. 이벤트 등록 **/
document.forms.appenderForm.onsubmit = appendItem;
$todoList.querySelectorAll('.remove').forEach(
    function ($remove){
        $remove.onclick = removeItem;
    }
)

$todoList.querySelectorAll('.complete').forEach(
    function ($complete){
        $complete.onclick = toggleItem;
    }
)

$todoList.querySelectorAll('.update').forEach(
    function ($update){
        $update.onclick = editItem;
    }    
)