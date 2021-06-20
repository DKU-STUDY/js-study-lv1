/**
 * AppenderForm에서 submit 이벤트가 발생했을 때 처리하는 함수
 * @param event
 */
function handleSubmitAppenderForm (event) {
  const input = event.target.querySelector('input');
  alert(`input에 입력된 텍스트: ${input.value}`);
  alert(`input에 입력된 텍스트의 길이: ${input.value.length}`);
}

/**
 * 앱 시작시 실행될 entry 함수
 */
function main () {
  // 추가 폼 전송 이벤트 등록
  document.forms.appenderForm.addEventListener('submit', handleSubmitAppenderForm);
}

// 앱 실행
main();
