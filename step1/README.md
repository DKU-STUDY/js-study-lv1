# 1주차: 웹에 대한 기본이론 + Todo List 만들기


## 이론 (1) - 웹 기본 이론
1. `브라우저`, `HTTP Protocal`, `HTML` 등의 연관성에 대해 조사하기
- `브라우저`는 서버와 클라이언트가 서로 통신하며 데이터, 컨텐츠를 받아 출력하는 프로그램이다.
- `HTTP Protocal`은 웹에서 데이터를 주고받기 위해 사전에 정해진 약속이다.
- 웹에서 `브라우저`와 `서버`가 데이터를 주고받기 위해서 HTTP를 사용한다.
- `HTML`은 웹페이지에 대한 정보를 담고 있는 언어이며, 웹페이지의 기본적인 구조를 만든다. (프로그래밍 언어와 다르다.)
- `HTTP`를 통해 주고받는 데이터가 주로 `HTML`이며 `HTML`은 `브라우저`에게 웹페이지에 대한 정보를 알려준다.
2. `DOM(Document Object Model)` 조사하기
- HTML이나 XML 문서를 위한 인터페이스.
- `DOM`이 없으면 자바스크립트 언어가 HTML 문서에 대한 정보를 얻을 수 없으며, 제어할 수 없게 된다.
- HTML 문서를 작성할 때, 각 요소 내부에 또 다른 자식 요소들이 있는 것처럼 아래로 갈수록 점점 뻗어나가는 계층 구조다.
3. `BOM(Browser Object Model)` 조사하기
- 웹 브라우저와 관련된 객체의 집합.
- `DOM`처럼 자바스크립트가 브라우저를 제어할 수 있게 브라우저 요소를 객체화한 것이다.
- 최상위 객체로 `Window`가 있고, 그 아래로 [`Doucument` `History` `Location` `Navigator` `Screen`] 등이 있다.
+) 객체지향 프로그래밍 : 프로그램을 독립된 단위이자 서로 상호작용하는 '객체'의 모임으로 보는 것.
4. `CSS(Cascading Style Sheet)` 조사하기
- 웹페이지가 화면 상에 표현될 스타일을 적용하는 '스타일 언어'
- 웹페이지를 보기 좋게 꾸미기 위한 디자인의 성격이 짙다.
- HTML도 디자인을 할 수 있는 요소들이 약간 있지만, 공식문서에서 대부분 해당 요소 대신 CSS를 사용하는 것을 권장한다.
5. `Javascript` 조사하기
- 웹페이지를 제어/동작하게 하는 객체 기반의 프로그래밍 언어.
- `Node.js`를 사용하면 클라이언트의 웹페이지 동작 뿐 아니라 서버에서도 사용할 수 있다.
- 상대적으로 보안이 취약하고, 브라우저 환경이 변경될 수 있어 신경써야 한다.
6. `ECMAScript` 조사하기
- `ECMAScript`는 ECMA-262라는 '기술 규격'이 정의하는 표준화된 스크립트 언어다.
- 스크립트 언어를 어떻게 만드는지에 대한 규칙 또는 설명서와 같다.
- `Javascript`는 `ECMAScript`의 하나다.


## 이론 (2) - 형상관리 및 협업
1. `git` 에 대해 조사하기
- 쉽게 말해서 버전 관리해주는 시스템이다.
- 수정된 내용을 저장하고 특정 시점으로 돌아가거나 분기를 만드는 등의 다양한 기능을 제공한다.
- 동시에 여러 명이 개발을 하면서 생기는 문제를 방지할 수 있다.
2. `github` 에 대해 조사하기
- `git`의 웹 호스팅 서비스로 프로젝트를 공유할 수 있다.
- `git`의 기능을 명령어가 아닌 그래픽 UI로 사용할 수 있다.
-  개발자 버전 SNS라고 생각하면 된다.
3. `github pull request` 에 대해 조사하기
- 저장소의 파일을 수정했으니 확인 후 merge해줄 것을 요청하는 것.
- 자연스럽게 코드 리뷰를 할 수 있고, 코드 충돌을 방지할 수 있다.
- 여러 명이 협업하는 경우 PR을 사용하는 편이 좋고, 오픈소스에 기여할 때도 쓴다.


## 실습(2)  - TodoList
- [X] 아이템 추가
  - [X] 입력한 내용이 없을 때 아이템 추가를 시도할 경우 `아이템 이름을 입력해주세요` 라고 경고창을 띄워야 한다.
  - [X] 아이템 추가 성공 시 TodoList에 반영된다.
- [X] 아이템 수정
  - [X] 아이템 내용 옆에 `수정` 버튼이 존재한다.
  - [X] `수정` 버튼을 클릭할 경우 아이템의 내용이 포함된 `input`으로 `DOM`이 변경된다.
  - [X] 수정 `input`에 내용을 입력 후 `Enter`를 누르거나 `완료 버튼`을 클릭하면 아이템의 내용이 수정된다.
  - [X] 수정 `input`에서 `esc`를 누르거나 `취소 버튼`을 클릭할 경우 수정이 취소된다.
- [X] 아이템 삭제
  - [X] 아이템 내용 옆에 `삭제` 버튼이 존재한다.
  - [X] `삭제` 버튼을 클릭할 경우 아이템이 삭제된다.
- [X] Todo 아이템 Toggle
  - [X] 아이테 내용 왼쪽에 체크박스가 존재한다.
  - [X] 체크박스를 클릭할 경우 아이템의 색상이 파란색으로 변경된다.
  
## TodoList 👀 구현에 필요한 필수 지식

### DOM (Document Object Model) 

> 문서 객체 모델(Document Object Model, DOM)은 웹 페이지 내의 모든 콘텐츠를 객체로 나타내줍니다.

```js
console.log(document); // HTML 문서의 root
console.log(document.head) // HTML 문서의 head 태그에 대한 객체 정보
console.log(document.body) // HTML 문서의 body 태그에 대한 객체 정보
```

- 원하는 DOM 객체 선택하기
```html
<!doctype html>
<html lang="en">
<head>
<title>h1 태그 선택하기</title>
</head>
<body>
  <h1>문서의 제목입니다. </h1>
  <p id="firstParagraph">첫 번째 문장입니다.</p>
  <p id="secondParagraph">두 번째 문장입니다.</p>
  <ul>
    <li class="red">class가 red인 list 태그입니다.</li>
    <li class="red">class가 red인 list 태그입니다.</li>
    <li class="blue">
      class가 blue인 list 태그입니다.
    </li>
    <li class="blue">
      class가 blue인 list 태그입니다.
      <a href="#">list 내부에 있는 a 태그입니다.</a>      
    </li>
  </ul>
  <script>
    // 태그 이름으로 선택하기
    console.log(document.getElementsByTagName('h1'))
    
    // id로 선택하기
    console.log(document.getElementById('firstParagraph'));
    console.log(document.getElementById('secondParagraph'));
    
    // class로 선택하기
    console.log(document.getElementsByClassName('red'));
    console.log(document.getElementsByClassName('blue'));
    
    // querySeletor로 선택하기
    console.log(document.querySelector('h1'));
    console.log(document.querySelectorAll('h1'));
    console.log(document.querySelector('#firstParagraph'));
    console.log(document.querySelector('#secondParagraph'));
    console.log(document.querySelector('#firstParagraph'));
    console.log(document.querySelector('#secondParagraph'));
    console.log(document.querySelectorAll('red'));
    console.log(document.querySelectorAll('blue'));
  </script>
</body>
</html>
```

- 참고링크: https://ko.javascript.info/document

### 이벤트

> 이벤트(event)는 무언가 일어났다는 신호입니다. 모든 DOM 노드는 이벤트를 발생시킵니다.

브라우저는 사용자의 상호작용을 이용하여 다양한 기능을 만들 수 있습니다.

- 마우스 이벤트
  - 태그를 클릭(`click`)했을 때
  - 마우스 커서가 태그에 진입(`mouseover`, `mouseenter`) 했을 때
  - 마우스 커서가 태그에서 벗어났을 때(`mouseout`, `mouseleave`)
  - 마우스를 누를 때(`mousedown`), 뗄 때(`mouseup`)
- 키보드 이벤트
  - 키보드를 누를 때 (keydown)
  - 키보드를 누르고 있을 때 (keypress)
  - 키보드를 뗄 때 (keyup)
- input tag 관련 이벤트
  - 값을 입력 할 때 (input)
  - 값이 변경 되었을 때 (change)
  - input에 포커싱 되었을 때 (focus)
  - input을 벗어날 때 (blur)
- form 관련 이벤트
  - 폼이 전송될 때 (submit)

가령 form이 전송 되는 시점(submit)에 input의 값을 검사하여 빈 칸이 있을 경우 전송을 취소하는 등의 작업을 할 수 있습니다.

- 참고링크: https://ko.javascript.info/events



