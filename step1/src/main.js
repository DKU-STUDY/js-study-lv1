// 코드 작성
/** 3. 이벤트에 대한 함수 추가 **/
// (1) 태그 추가 함수
function appendItem (event){
    //고유 이벤트 제거
    event.preventDefault();

    //태그 선택
    var $appender = $appenderForm.querySelector('input');

    //태그 생성
    var $newItem = document.createElement('li');
    
    //태그의 내용을 채워넣기
    $newItem.innerHTML = `
        <p>
          ${$appender.value}
        </p>
        <button class = "complete" type="button">취소</button>
        <button class = "update" type="button">수정</button>
        <button class = "remove" type="button">삭제</button>
    `;
    $todoList.appendChild($newItem);
    $appender.value = ' ';
    $appender.focus();

    //추가된 아이템의 삭제 버튼에 이벤트 등록
    $newItem.querySelector('.remove').onclick = removeItem;
    $newItem.querySelector('.complete').onclick = toggleItem;
    $newItem.querySelector('.update').onclick = editItem;
    }

// (2) 태그 삭제 함수
    function removeItem (event){
    event.target.parentNode.remove();
}

// (3) 아이템 토글 함수
function toggleItem (event) {
    var $content = event.target.parentNode.querySelector('p');
    var completed= event.target.innerHTML === '취소';
    $content.style.color = completed ? '' : '#09F';
    event.target.innerHTML = completed ? '완료' : '취소';
 }

// (4) 아이템 수정으로 전환하는 함수
function editItem (event){
    var $parent = event.target.parentNode;
    var originalHTML = $parent.innerHTML;

    $parent.innerHTML = `
    <form name="modifierForm" action="">
    <fieldset>
      <legend hidden>아이템 수정</legend>
      <label>
        <span hidden>아이템 수정</span>
        <input type="text" value="${parent.querySelector('p').innerHTML.trim()}" size="40">
      </label>
      <button type="submit">완료</button>
      <button class "cancel" type="button">취소</button>
    </fieldset>
  </form>
  `;

    function registerEvent(){
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
        $parent.innerHTML = originalHTML;
        registerEvent();
    }

    var $editForm = $parent.querySelector('form')
    $editForm.onsubmit = function (event) {
        event.preventDefault();
        var newContent = $editForm.querySelector('input').value;
        $parent.querySelector('p').innerHTML = newContent;
        registerEvent();
        }
    }

/** 1. DOM 접근 **/
var $appenderForm = document.forms.appenderForm;
var $todoList = document.querySelector('#todoList');

/** 2. 이벤트 등록 **/
$appenderForm.onsubmit = appendItem;
$todoList.querySelectorAll('.remove').forEach(
    function ($remove) {
        $remove.onclick = removeItem;
    }
)
$todoList.querySelectorAll('.complete').forEach(
    function ($complete) {
        $complete.onclick = toggleItem;
    }   
)
$todoList.querySelectorAll('.update').forEach(
    function ($update) {
        $update.onclick = editItem;
    }   
)
    