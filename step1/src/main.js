// 코드 작성

//사용자가 입력하는 거: event (키보드 이벤트, 마우스 이벤트,,,)
//네이버 로그인창같은거: form 입력 받는거: input tag
//submti --> action

/** 3. 이벤트에 대한 함수 추가 **/
// (1) 태그 추가 함수
function appendItem (event) {
  //고유 이벤트 제거
  event.preventDefault();
  
  //콘솔창에서 정보 보기
  console.log(event); 

  //태그 선택
  var $appender = $appenderForm.querySelector("input");

  //태그 생성
  var $newItem = document.createElement("li")


  //태그에 내용 채워넣기
  $newItem.innerHTML = `
    <p>
      ${$appender.value}
    </p>
    <button class="complete" type="button">완료</button>
    <button class="update" type="button">수정</button>
    <button class="remove" type="button">삭제</button>
  `;
  $todoList.appendChild($newItem);
  //appender 값 초기화
  $appender.value = '';
  //커서가 글로 가게끔
  $appender.focus();     

  // 추가된 아이템의 버튼에 이벤트 등록
  $newItem.querySelector(".remove").onclick = removeItem;
  $newItem.querySelector(".complete").onclick = removeItem;
  $newItem.querySelector(".update").onclick = editItem;

}

//(2) 태그 삭제 함수
function removeItem (event) {
  event.target.parentNode.remove();
}

//(3) 아이템 토글 함수
function toggleItem(event) {
  var $content = event.target.parentNode.querySelector("p");
  var completed = event.target.innerHTML == "취소";
  $content.style.color = completed ? "" : "#09F";
  event.target.innerHTML = completed ? "완료" : "취소";
}

//(4) 수정함수
function editItem (event) {
  var $parent = event.target.parentNode;
  var originHTML = $parent.innerHTML;
  $parent.innerHTML = `
    <form name="modifierForm" action="">
      <fieldset>
        <legend hidden>아이템 수정</legend>
        <label>
          <span hidden>아이템 수정</span>
          <input type="text" value="${$parent.querySelector('p').innerHTML.trim()}}" size="40">
        </label>
        <button type="submit">완료</button>
        <button class = "cancel" type="button">취소</button>
      </fieldset>
    </form>
  `;

  function registerEvent () {
    $parent.querySelectorAll('.update').forEach(function ($update) {
      $update.onclick = editItem;
    })
    $parent.querySelectorAll('.remove').forEach(function ($remove) {
      $remove.onclick = removeItem;
    })
    $parent.querySelectorAll('.complete').forEach(function ($complete) {
      $complete.onclick = toggleItem;
    })
  }

  $parent.querySelector(".cancel").onclick = function () {
    $parent.innerHTML = originHTML;
    registerEvent();
  }

  var $editForm = $parent.querySelector("form");
  $editForm.onsubmit = function (event) {
    event.preventDefault();
    var newContent = $editForm.querySelector("input").value;
    console.log(newContent);
    $parent.innerHTML = originHTML;
    $parent.querySelector("p").innerHTML = newContent;
    registerEvent();
  }
}

/** 1. DOM 접근 **/
var $appenderForm = document.forms.appenderForm;
var $todoList = document.querySelector("#todoList"); //고유 

/** 2. Event 등록 --> 로딩되자마자 실행되는 것. 그래서 새로 추가한 거 삭제는 X, 따로 이벤트 등록해줘야함 **/
$appenderForm.onsubmit = appendItem();
$todoList.querySelectorAll('.remove').forEach( //.은 클래스를 의미
  function ($remove) {
    $remove.onclick = removeItem;
  }
) 

$todoList.querySelectorAlL('.complete').forEach(
  function($complete) {
    $complete.onclick = toggleItem;
  }
)

$todoList.querySelectorAlL('.update').forEach(
  function($update) {
    $complete.onclick = editItem;
  }
)

//자바스크립트의 함수
// 1. 변수에 저장 가능              : var a = function () {alert("안녕하세요")}
// 2. 함수의 매개변수로 넘길 수 O 
//    function b (fn, n1, n2) { alert(fn(n1, n2)); }
//    b(function (n1, n2)) {return `n1 = ${n1}, n2 = ${n2`}, 10, 20)
//    function add(n1, n2) {return n1 + n2}
//    function sub(n1, n2) {return n1 - n2}
//    b(add, 10, 20)
//    b(sub, add(10, 20), 20)
// 3. 함수의 리턴값으로 함수 반환 O
//    funcion add(n1) { return function (n2) { return n1 + n2;}}
//    const add10 = add(10);
//    add10(30);
