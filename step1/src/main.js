// 코드 작성

//사용자가 입력하는 거: event (키보드 이벤트, 마우스 이벤트,,,)
//네이버 로그인창같은거: form 입력 받는거: input tag
//submti --> action

//3. 태그 추가 함수
function appendItem (event) {
        //고유 이벤트 제거
        event.preventDefault();
    
        console.log(event); //콘솔창에서 정보 보기
    
        //태그 선택
        var $newItem = document.createElement("li")
        
        //태그 생성
        var $appender = $appenderForm.querySelector('input');
    
        //태그에 내용 채워넣기
        $newItem.innerHTML = `
        <p>
          ${$appender.value}
        </p>
        <button type="button">완료</button>
        <button type="button">수정</button>
        <button type="button">삭제</button>
        `;
            
        document.getElementById("todoList").appendChild($newItem);
        //appender 값 초기화
        $appender.value = '';
        //커서가 글로 가게끔
        $appender.focus(); 
    }
    
}

//1. DOM 접근
var $appenderForm = document.forms.appenderForm;

//2. Event 등록
$appenderForm.onsubmit = appendItem();
