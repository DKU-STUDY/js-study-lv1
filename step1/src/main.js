// 코드 작성

// 3. 태그 추가 함수
function appendItem (event) {
  // 고유 이벤트 제거
  event.preventDefault();

  // 태그 선택
  var $appender = $appenderForm.querySelector('input');

  // 태그 생성
  var $newItem = document.createElement('li');

  // 태그에 내용을 채워넣기
  $newItem.innerHTML = `
  <p>
    ${$appender.value}
  </p>
  <button type="button">완료</button>
  <button type="button">수정</button>
  <button type="button">삭제</button>
`;
  document.getElementById('todoList').appendChild($newItem);
  $appender.value = '';
  $appender.focus();
}

// 1. DOM 접근
var $appenderForm = document.forms.appenderForm;

// 2. 이벤트 등록
$appenderForm.onsubmit = appendItem;