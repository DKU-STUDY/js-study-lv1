# 1주차: 웹에 대한 기본이론 + Todo List 만들기

## 📣 요구사항

### 이론 (1) - 웹 기본 이론
- [X] `브라우저`, `HTTP Protocal`, `HTML` 등의 연관성에 대해 조사하기 (5문장 요약)  
  HTML: HyperText Markup Language, 구조적 의미와 문서를 갖고 있는 텍스트 파일
    구조적 의미: 1., 1), (1) 과 같은 목록 수준
    문서: 이미지, 텍스트 등
  HTTP Protocal: 초본문전송규약, 인터넷 상에서 HTML같은 리소스 데이터 전송하는 프로토콜
    HyperText Transfer: 링크 기반 데이터 공유
  브라우저: HTML파일을 사용하여 웹페이지를 생성하여 화면에 출력 (크롬, 마이크르소프트 엣지 등)
  
- [X] `DOM(Document Object Model)` 조사하기 (3문장 요약)
  문서 객체 모델, 웹 문서(HTML, SVG)에 접근하기 위한 인터페이스(트리구조)
  문서 내 요소 정의, 접근 방법 제공 
  HTML 문서(텍스트)가 다른 프로그램에서 사용할 수 있도록 객체 모델로 변환 (브라우저간의 호환성 문제 생길수도)

- [X] `BOM(Browser Object Model)` 조사하기 (3문장 요약)
  브라우저 전체를 객체화시킨 것 -> 프로그래밍적으로 제어할 수 있음
  window 아래 document, history, location, navigator, screen 등 생성(트리구조)
  window(하나의 창), document(html 정보 갖는 문서), history, location(url), navigator(브라우저 정보), screen 등

- [X] `CSS(Cascading Style Sheet)` 조사하기 (3문장 요약)
  HTML 등으로 작성된 문서의 표시 방법(장식 개념)을 기술하는 스타일 시트 언어(실제언어는 아님)
  selector(선택자, 장식 요소)의 property(속성, 색깔)의 속성값을 선언(노랑)하는 방식

- [X] `Javascript` 조사하기 (3문장 요약)
  ECMAScript 사양을 따르는 객체 기반 스크립트 프로그래밍 언어
  객체 기반 스크립트 프로그래밍 언어로 ECMAScript의 표준 사양을 구현

- [X] `ECMAScript` 조사하기 (3문장 요약)
  ECMA에서는 정보통신에 대한 표준을 제시
  ECMAScript는 ECMA-262(Script Language Specification)에 따라 만든 script언어
  일종의 규칙인 ECMAScript를 따르는 언어가 JavaScript

### 이론 (2) - 형상관리 및 협업
- [X] `git` 에 대해 조사하기 (3문장 요약)
  파일의 변경사항을 추적해서 사용자들 간의 작업을 조율할 수 있는 분산 버전 관리 시스템

- [X] `github` 에 대해 조사하기 (3문장 요약)
  Markdown, repository(저장 폴더), fork(다른 사람의 repository를 찝어 내가 사용), pull request, merge 등 가능

- [X] `github pull request` 에 대해 조사하기 (3문장 요약)
  코드 리뷰, 오픈소스 프로젝트 참여 등의 목적에 따라 fork한 후, 수정한 코드 merge를 신청하는 과정
  

### 실습 (1) - git 사용 + 자기소개
- [X] 자기소개 페이지 만들기
```
- 사는 곳: 경기도 용인시 수지구.
- 자신을 한 마디로 규정짓는다면?: (현재는) 320호 지박령
- 좌우명: 딱히 없다.
- 별명(생략 가능): 노다지, 노주
- 스트레스를 받을 때 나만의 해소법: 잔다.
- 좋아하는 사람의 유형: 웬만해서는 다 좋아한다.
- 싫어하는 사람의 유형: 본인이 할 일을 다른 사람에게 미루는 사람.
- 주위 사람들이 본인에 대해 어떻게 표현하나요?: 친구에게 카톡하니 "과격함과 나긋나긋함이 공존하는 센세이션...?"라고 답장이 왔다.
- 가장 기억에 남는 책: 오즈의 마법사 13권까지만.
- 가장 기억에 남는 여행: 12월 뉴욕 여행.
- 좋아하는 음악 장르 혹은 뮤지션: 데미 로바토.
- 개발자로서의 목표: 꿈이 개발자는 아니지만, 그래도 필요한 것들을 뚝딱뚝딱 만들어낼 수 있는 개발능력을 가지면 좋겠다.
- 꿈: 스택 오버플로우에서 척척 대답해줄 수 있는 사람이 되고 싶다.
```
- [ ] `ul`, `li`, `img`, `div` 태그 등을 필수로 사용
  - [X] ul, li 사용
  - [ ] <img scr = "https://i.imgur.com/kRbvl0D.png"> 했는데, 사진이 html에서 안보임
  - [ ] <div>를 사용했는데, html파일에서 뭐가 안달라져서 뺐다.

### 실습 (2) - TodoList
- [X] 아이템 추가
  - [X] 아이템 추가 `input`에 텍스트를 입력 후 `Enter`를 누르거나 `생성 버튼`을 클릭하여 아이템을 추가할 수 있다.
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
  - [X] 아이템 내용 왼쪽에 체크박스가 존재한다.
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



