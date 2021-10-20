// 코드 작성

/** 3. 이벤투에 대한 함수 추가 **/ 
//(1) 태그 추가 함수
function appendItem(event)
{
    //고유 이벤트 제거
    event.preventDefault();
        
    // 태그 선택
    var $appender = $appenderForm.querySelector('input')

    // 태그 생성
    var $newItem = document.createElement('li');

    // 태그에 내용 채워넣기
    $newItem.innerHTML = `
        <p>
            ${$appender.value}
        </p>
        <button class="complete" type="button">완료</button>
        <button class="update" type="button">수정</button>
        <button class="remove" type="button">삭제</button>
    `;
    $todoList.appendChild($newItem);
    //document.getElementById('todoList').appendChild($newItem);
    $appender.value = '';
    $appender.focus();

    //추가된 아이템의 삭제 버튼에 이벤트 등록
    // $newItem.querySelector('.remove').onclick = function () {
    //     $newItem.remove();
    // }

    $newItem.querySelector('.remove').onclick = removeItem;
    $newItem.querySelector('.complete').onclick = toggleItem;
    $newItem.querySelector('.update').onclick = editItem;

}

//event의 target은 뭐여
//remove class를 가리키는 건가보다

//(2) 태그 삭제 함수
function removeItem(event){
    event.target.parentNode.remove();
}

//(3) 아이템 토클 함수
function toggleItem(event){
    var $content = event.target.parentNode.querySelector('p')
    var completed = event.target.innerHTML === '완료';
    $content.style.color = completed ? '#09F' : '';
    //위에가 완료된 상태이므로 글자를 취소가 될 수 있도록 바꿔준다
    event.target.innerHTML = completed ? '취소' : '완료';
}
//(4) 아이템 수정으로 전환하는 함수
function editItem (event) {

        //event target ->form //의 parent은 li
        //button 수정 클릭 >> 부모 li 의 innerHTML을 `--`이와 같이 바꿔줌
        var $parent = event.target.parentNode;
        var originHTML = $parent.innerHTML;
        
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
    function registerEvent() {
        $parent.querySelectorAll('.update').forEach(function ($update){
            $update.onclick = editItem;        
        })
        $parent.querySelectorAll('.remove').forEach(function ($remove){
            $remove.onclick = removeItem;        
        })
        $parent.querySelectorAll('.complete').forEach(function ($complete){
            $complete.onclick = toggleItem;        
        })
    }
    
    $parent.querySelector('.cancel').onclick = function () {
        $parent.innerHTML = originHTML;
        //update를 선택하는 이유?
        //수정이라는 기능을 다시 넣어주는 거구나
        registerEvent();
    }
 
    var $editForm = $parent.querySelector('form');
    $editForm.onsubmit = function (event) {
        event.preventDefault();
        //form의 event 해제
        var newContent = $editForm.querySelector('input').value;
        $parent.innerHTML = originHTML;
        $parent.querySelector('p').innerHTML = newContent;
        registerEvent();
    }
}

 

/**  1. dom 접근 **/
//이벤트를 받아서 실행을 해야된다
var $appenderForm = document.forms.appenderForm;
var $todoList = document.querySelector('#todoList');

/**2. 이벤트 등록 **/
$appenderForm.onsubmit = appendItem;

//forEach에 대해서 각각을 $remove
$todoList.querySelectorAll('.remove').forEach(
    function($remove) {
        $remove.onclick = removeItem;
    }
)

$todoList.querySelectorAll('.complete').forEach(
    function($complete){
        $complete.onclick = toggleItem; 
        }
)

$todoList.querySelectorAll('.update').forEach(
    function($update){
        $update.onclick = editItem;
    }
)

//문제가 추가를 하면 삭제가 안댐 코드가 실행이 되는 시점은 브라우저가 로딩이 되는
//시점에 실행이 됨 그렇기 때문에 추가된 항목에 대해서는 이벤트 등록 시점에 없는 태그!
// 이것을 등록 하기


