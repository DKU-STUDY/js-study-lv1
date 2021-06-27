# 1주차: [워밍업] Todo List 만들기

## 📣 요구사항

- [x] 아이템 추가
  - [x] 아이템 추가 `input`에 텍스트를 입력 후 `Enter`를 누르거나 `생성 버튼`을 클릭하여 아이템을 추가할 수 있다.
  - [x] 입력한 내용이 없을 때 아이템 추가를 시도할 경우 `아이템 이름을 입력해주세요` 라고 경고창을 띄워야 한다.
- [x] 아이템이 추가 성공 시 TodoList에 반영된다.
- [x] 아이템 수정
  - [x] 아이템 내용 옆에 `수정` 버튼이 존재한다.
  - [x] `수정` 버튼을 클릭할 경우 아이템의 내용이 포함된 `input`으로 `DOM`이 변경된다.
  - [x] 수정 `input`에 내용을 입력 후 `Enter`를 누르거나 `완료 버튼`을 클릭하면 아이템의 내용이 수정된다.
  - [x] 수정 `input`에서 `esc`를 누르거나 `취소 버튼`을 클릭할 경우 수정이 취소된다.
- [x] 아이템 삭제
  - [x] 아이템 내용 옆에 `삭제` 버튼이 존재한다.
  - [x] `삭제` 버튼을 클릭할 경우 아이템이 삭제된다.
- [ ] Todo 아이템 Toggle
  - [ ] 아이템 내용 왼쪽에 체크박스가 존재한다.
  - [ ] 체크박스를 클릭할 경우 아이템의 색상이 파란색으로 변경된다.

## 👀 구현에 필요한 지식

### DOM (Document Object Model)

> 문서 객체 모델(Document Object Model, DOM)은 웹 페이지 내의 모든 콘텐츠를 객체로 나타내줍니다.

```js
console.log(document); // HTML 문서의 root
console.log(document.head); // HTML 문서의 head 태그에 대한 객체 정보
console.log(document.body); // HTML 문서의 body 태그에 대한 객체 정보
```

- 원하는 DOM 객체 선택하기

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>h1 태그 선택하기</title>
  </head>
  <body>
    <h1>문서의 제목입니다.</h1>
    <p id="firstParagraph">첫 번째 문장입니다.</p>
    <p id="secondParagraph">두 번째 문장입니다.</p>
    <ul>
      <li class="red">class가 red인 list 태그입니다.</li>
      <li class="red">class가 red인 list 태그입니다.</li>
      <li class="blue">class가 blue인 list 태그입니다.</li>
      <li class="blue">
        class가 blue인 list 태그입니다.
        <a href="#">list 내부에 있는 a 태그입니다.</a>
      </li>
    </ul>
    <script>
      // 태그 이름으로 선택하기
      console.log(document.getElementsByTagName('h1'));

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
