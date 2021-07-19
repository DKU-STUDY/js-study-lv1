# 4주차: API 연동

Step2에서 작업한 내용과 Step3에서 작업한 내용을 합치는 과정

- [ ] 사전 조사
  - [X] AJAX란?
  - [X] XMLHttpRequest API
  - [X] Fetch API
  - [ ] CORS
  - [X] Promise, async, await
- [X] API 연동하기
  - [X] 번들러로 빌드 하기
  - [X] 빌드한 HTML/CSS/JS를 Server와 연동하기
  - [X] fetch api를 이용하여 html에서 server 데이터 가져오기

## 사전 조사에 대한 참고 링크

- AJAX
  - AJAX는 Asynchronous Javascript And Xml의 약자이다. 과거에는 변경 내용이 생겼을 때 페이지를 다시 로드해야 했다면 AJAX로 변경된 내용만 다시 로드하는 기법으로 javascript를 이용한 비동기 통신, 클라이언트와 서버간 XML데이터를 주고 받는 기술이다. 이때 사용하는 것이 XMLHttpRequest 객체이다. 이 객체로 서버에 요청을하고 서버에서는 응답을 하게 된다.
  
- XHR(XMLHttpRequest)
  - 위에서 잠깐 언급했지만 XMLHttpRequest는 HTTP를 통해서 데이터를 주고 받을 수 있게 도와주는 객체이다. 아래는 간단한 예시이다.
  ```js
  var xhr = new XMLHttpRequest();
  xhr.open('GET','http://localhost:3000',true);
  xhr.send(null);
  ```
  위 코드는 XMLHttpRequest 객체를 생성하고 open함수를 통해 메소드 방식과 url, 동기/비동기 여부를 나타낸 후 request 하는 코드이다. 아래는 서버로 부터 제대로 값을 받았을 때 처리하는 코드이다.
  ```js
  xhr.onreadystatechange = () => {
    if(xhr.status == 200) {
      // do something
    }
  }
  ```

- Fetch API
  - AJAX를 구현하는 기술 중에 기존 방식들 보다 유연한 기술 중에 하나가 fetch API이다. 위에 언급된 XHR객체도 AJAX에 사용되었지만 이것은 잘 디자인 되어있지 않다. 위 처럼 이벤트 등록을 통해 변경사항을 처리했는데 요청의 성공, 실패 등에 처리하는 로직이 들어가기 좋지 않았다. 이에 fetch api를 도입해 더 깔끔한 비동기 방식이 생긴 것이다. 
  
- Promise, async, await
  - Promise는 javascript 오브젝트의 특별한 형태이다. javascript 변수가 될 수 있는 모든 값은 다 promise가 될 수 있다. 이때 promise에 접근하려면 .then()을 사용해야한다. promise는 약속이라는 의미로 미래를 나타내는 데이터를 위한 것이지만 내가 약속을 하고 있다면 그 데이터가 미래에 있든 미리 받았든 상관이 없다. 단지 then만 호출하면 된다. 이는 비동기와도 연결된다. 당장 사용해도 되고 아니여도 되고 비동기로 사용할 것이라고 말이다.
  - 다만 이런 promise는 동기적 프로그래밍을 위해서 항상 then을 사용해야하는데 이는 불편하다. 따라서 async/await을 도입한다. async 같은 경우는 function 앞에 async라는 키워드를 붙인다.