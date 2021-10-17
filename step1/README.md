# 1주차: 웹에 대한 기본이론 + Todo List 만들기

## 📣 요구사항

### 이론 (1) - 웹 기본 이론  [:link:](https://ko.wikipedia.org/wiki/%EC%9B%B9_%EB%B8%8C%EB%9D%BC%EC%9A%B0%EC%A0%80)
#### `브라우저`, `HTTP Protocal`, `HTML` 등의 연관성에 대해 조사하기
- **브라우저** 는 웹 서버와 통신할 수 있으며, HTML 문서나 파일을 출력하는 GUI 기반의 응용소프트웨어이다. 
- **HTML** 은 제목, 단락, 등 구조적 문서있는 방법을 제공한다. 1980년, 유럽 입자 물리 연구소 연구원들이 문서를 이용하고 공유하기 위한 체계로 시작하였다. 
팀 버너스리는 인터넷 기반 하이퍼텍스트 체계를 제안하였고, 브라우저와 서버 소프트웨어를 작성했다.
- **하이퍼텍스트**
    - 참조(하이퍼링크; 하이퍼텍스트 문서 안에서 직접 모든 형식의 자료를 연결하고 가리킬 수 있는 참조 고리)를 통해 한 문서에서 다른 문서로 즉시 접근할 수 있는 텍스트.
- **HTTP protocol**[hyper-text transfer protocol]
    - 웹 브라우저는 웹페이지를 가져오기 위해 대부분의 웹서버가 사용하는 HTTP 로 통신한다.  
    - 클라이언트와 서버 사이에 이루어지는 request/response 프로토콜이다. 

#### `DOM(Document Object Model)` 조사하기 (3문장 요약)
HTML / XML 문서의 프로그래밍 인터페이스로, 문서의 구조화 된 표현을 제공한다. 
프로그래밍 언어가 DOM 구조에 접근할 수 있는 방법을 제공하고, DOM 을 통해 문서 구조, 스타일, 내용 들을 변경할 수 있다. 

#### `BOM(Browser Object Model)` 조사하기 (3문장 요약)
브라우저가 제공하는 객체로, 자바스크립트가 브라우저에게 명령을 내릴 수 있게 한다. (HTML 명세의 일부이다.) 

브라우저가 제공하는 내용
- 브라우저 정보, 클라이언트 운영체제에 대한 정보
- 현재 URL
- 사용자와 브라우저 사이의 커뮤니케이션을 도와주는 메서드 
    - alert / confirm / prompt

#### `CSS(Cascading Style Sheet)` 조사하기 (3문장 요약) [:link:](https://developer.mozilla.org/ko/docs/Web/CSS)
HTML 이나 XML로 작성된 문서의 표시 방법을 기술하기 위한 스타일 시트 언어이다. 
Element 가 화면, 종이, 음성이나 다른 매체 상에 어떻게 렌더링 되어야 하는지 지정한다. 

#### `Javascript` 조사하기 (3문장 요약) [:link:](https://developer.mozilla.org/ko/docs/Web/JavaScript)
인터프리터 혹은 just-in-time 컴파일 프로그래밍 언어이다.  
웹 페이지를 위한 언어로 잘 알려져 있지만, Node.js, Apache CouchDB, Adobe Acrobat 처럼 많은 비 브라우저 환경에서도 사용하고 있다. 
ECMAScript 언어 표준을 따른다. 

> JIT 컴파일러는 
> 실행 시점에서 인터프리트 방식으로 기계어 코드를 생성하면서 그 코드를 캐싱하여, 
> 같은 함수가 여러 번 불릴 때 매번 기계어 코드를 생성하는 것을 방지한다.

#### `ECMAScript` 조사하기 (3문장 요약)
ECMA-262 기술 규격에 따라 정의하고 있는 표준화된 스크립트 프로그래밍 언어를 말한다. 자바스크립트를 표준화하기 위해 만들어졌다. 
 
### 이론 (2) - 형상관리 및 협업
#### `git` 에 대해 조사하기 (3문장 요약)
컴퓨터 파일의 변경사항을 추적하고 여러 명의 사용자들 간에 해당 파일들의 작업을 조율하기 위한 분산 버전 관리 시스템이다. 
2005년에 리눅스 커널 개발을 위해 초기 개발에 기여한 다른 커널 개발자들과 함께 2005년에 리누스 토르발스가 처음 개발한 것이다

#### `github` 에 대해 조사하기 (3문장 요약)
깃 (Git)저장소 호스팅을 지원하는 웹 서비스이다. 

#### `github pull request` 에 대해 조사하기 (3문장 요약)
코드 검토 및 댓글을 지원한다. 

개발자는 새 변경사항을 유지보수자에게 알리기 위해 풀 리퀘스트를 생성한다. 
댓글 스레드가 개별 풀 리퀘스트에 연결된다. 
이를 통해 코드 변경에 대한 집중화된 토론이 가능해진다. 
제출된 풀 리퀘스트들은 저장소 접근이 가능한 누구나 볼 수 있다. 풀 리퀘스트는 유지보수자들에 의해 수락되거나 거절될 수 있다.

### 실습 (1) - git 사용 + 자기소개
- [자기소개 페이지 만들기](https://github.com/DKU-STUDY/Profile/blob/master/%EB%B0%95%EC%9D%80%EC%98%81_%EC%9E%90%EA%B8%B0%EC%86%8C%EA%B0%9C.md)

### 실습 (2) - TodoList
- [x] 아이템 추가
  - [x] 아이템 추가 `input`에 텍스트를 입력 후 `Enter`를 누르거나 `생성 버튼`을 클릭하여 아이템을 추가할 수 있다.
  - [x] 입력한 내용이 없을 때 아이템 추가를 시도할 경우 `아이템 이름을 입력해주세요` 라고 경고창을 띄워야 한다.
- [x] 아이템 추가 성공 시 TodoList에 반영된다.
- [x] 아이템 수정
  - [x] 아이템 내용 옆에 `수정` 버튼이 존재한다.
  - [x] `수정` 버튼을 클릭할 경우 아이템의 내용이 포함된 `input`으로 `DOM`이 변경된다.
  - [x] 수정 `input`에 내용을 입력 후 `Enter`를 누르거나 `완료 버튼`을 클릭하면 아이템의 내용이 수정된다.
  - [x] 수정 `input`에서 `esc`를 누르거나 `취소 버튼`을 클릭할 경우 수정이 취소된다.
- [x] 아이템 삭제
  - [x] 아이템 내용 옆에 `삭제` 버튼이 존재한다.
  - [x] `삭제` 버튼을 클릭할 경우 아이템이 삭제된다.
- [ ] Todo 아이템 Toggle
  - [ ] 아이테 내용 왼쪽에 체크박스가 존재한다.
  - [ ] 체크박스를 클릭할 경우 아이템의 색상이 파란색으로 변경된다.
  
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



