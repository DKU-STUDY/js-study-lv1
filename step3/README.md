# 3주차: node.js + express.js + REST API + ajax

## 요구사항

- [x] 사전 조사
  - [x] node.js에 대한 개념
   - 브라우저 밖에서도 `JavaScript`가 동작하도록 하는 런타임 환경. (`Node.js = 서버`는 아님.))
   - 비동기 처리, 단일 쓰레드, 빠른 속도, 이벤트 기반.
    - 쓰레드 : 프로그램(프로세스)의 실행 단위. 스레드끼리는 부모의 메모리를 공유함.
    - 논-블로킹 방식 : 이전 작업이 끝날 때까지 대기하지 않고 다음 작업을 수행함.
   - I/O 요청이 많은 경우 노드를 서버로 사용하기 좋음. 단일 쓰레드이므로 CPU에 부하가 많은 작업에는 적절하지 않음.
  
  - [x] express.js 대한 개념
   - `Node.js`의 웹 프레임워크.
   - 각종 라이브러리, 미들웨어가 내장되어 있고 코드의 통일성/안정성을 높여 개발을 쉽고 편하게 할 수 있게 도움.
   - 라우팅, 템플릿 엔진, 보안, 세션 등의 기능과 API를 제공함.
    - 라우팅 : 네트워크 안에서 데이터를 보낼 때, 경로를 결정하는 과정.

  - [x] Javascript와 NodeJS의 공통점/차이점
   - `JavaScript`는 프로그래밍 언어, `Node.js`는 `JavaScript` 런타임 환경.
   - `JavaScript`는 웹 브라우저(프론트엔드)에서 사용하고, `Node.js`는 '주로' 백엔드 개발을 위해 만들어짐.
   - Node.js = 브라우저의 V8(JavaScript 엔진)이 밖으로 나온 것 (준일님 블로그ㅎ)

  - [x] RESTful, RESTAPI 등에 대해 조사하기 (5문장 요약)
   - `REST` : 어떤 자원에 대해서 CRUD 요청을 메서드를 통해 특정한 형태로 전달하는 방식
    - URI : Uniform Resource Identifier. 자원을 식별하기 위한 문자열 구성. URL보다 더 넓은 개념임.
    - CRUD : Create, Read, Update, Delete.
   - `REST`의 특성으로 '일관적인 인터페이스', '무상태성', '캐시 가능', '서버-클라이언트 구조', '자체 표현', '계층 구조'가 있음.
   - `REST API` : `REST`에 기반으로 만들어진 API.
   - `REST API`를 사용한 서버를 `RESTful`하다고 함. 'REST스러운' 정도로 생각하면 될 것 같다.

   - HTTP 요청 메서드
    1. GET : 서버의 자원을 조회할 때
    2. POST : 서버에 자원으로 새로 등록할 때
    3. PUT : 서버의 자원을 대체(치환)할 때
    4. PATCH : 서버의 자원을 일부 수정할 때
    5. DELETE : 서버의 자원을 삭제 할 때

  - [x] AJAX란?
   - Asynchronous JavaScript And XML.
   - 브라우저가 가진 XMLHTTPRequest 객체로 페이지의 일부만 비동기적으로 데이터를 로드하는 방법.
   - XML 형태로 페이지 전체가 아닌 필요한 일부만 다시 불러오게 되면 시간과 자원을 아낄 수 있음.

  - [x] CORS
   - Cross Origin Resource Sharing. 교차 출처 리소스 공유.
   - SOP(동일 출처 정책)으로 브라우저는 보안을 위해 다른 출처의 리소스 접근을 금지하는데, 외부의 리소스를 가져오기 위한 SOP의 예외가 CORS.
   - 브라우저가 외부 리소스를 요청할 때 추가적인 헤더에 요청에 대한 내용을 담아 서버에 전송하고, 서버는 접근이 허용된 출처를 헤더에 담아 브라우저에게 전송함.
   
- [x] 기능구현
  - [x] REST API 구현
    - [x] CRUD(Create, Read, Update, Delete)
      - [x] 아이템 조회
      - [x] 아이템 추가
      - [x] 아이템 내용 수정
      - [x] 아이템 토글
      - [x] 아이템 삭제
    - [x] 데이터를 저장할 수 있는 형태로 관리한다.
      - [x] 파일시스템(json) or MySQL or MongoDB 중 택 1
  - [x] 서버에서 HTML 불러오기
    - [x] static middleware를 이용
  - [x] fetch를 사용하여 API 연동하기
  
## 사전조사에 대한 참고링크

- NodeJS
  - [공식문서](https://nodejs.org/ko/docs/guides/)
  - https://perfectacle.github.io/2017/06/18/what-is-node-js/
  - [javascript와 nodejs](http://junil-hwang.com/blog/javascript-node-js/)
- Javascrtip와 NodeJS의 공통점/차이점
  - [javascript와 nodejs](http://junil-hwang.com/blog/javascript-node-js/)
  - https://hazel-developer.tistory.com/152
- Restful, REST API
  - [REST란? REST API란? RESTful이란?](https://gmlwjd9405.github.io/2018/09/21/rest-and-restful.html)
  - [RESTful이란?](https://nesoy.github.io/articles/2017-02/REST)
  - [도대체 뭐가 RESTful 이라는건가?](http://www.chidoo.me/index.php/2016/06/03/what-is-restful/)
- express.js에 대한 개념
  - [공식문서](https://expressjs.com/ko/)
  - http://junil-hwang.com/blog/nodejs-express/
- AJAX
  - https://ko.wikipedia.org/wiki/Ajax
  - https://velog.io/@surim014/AJAX%EB%9E%80-%EB%AC%B4%EC%97%87%EC%9D%B8%EA%B0%80
  - https://coding-factory.tistory.com/143
- XHR(XMLHttpRequest)
  - https://developer.mozilla.org/ko/docs/Web/API/XMLHttpRequest
  - https://developer.mozilla.org/ko/docs/Web/Guide/AJAX/Getting_Started
  - http://tcpschool.com/xml/xml_dom_xmlHttpRequest
- Fetch API
  - https://developer.mozilla.org/ko/docs/Web/API/Fetch_API/Using_Fetch
  - https://ko.javascript.info/network
  - https://ko.javascript.info/fetch
  - https://developers.google.com/web/fundamentals/primers/async-functions?hl=ko
  - https://developers.google.com/web/fundamentals/primers/async-functions?hl=ko
- CORS
  - https://developer.mozilla.org/ko/docs/Web/HTTP/CORS
  - https://gitlab.com/siots-study/topics/-/wikis/CORS&HTTP&HTTPS&HTTPCache
- Promise, async, await
  - https://gitlab.com/siots-study/topics/-/wikis/asyncronous
  - http://junil-hwang.com/blog/javascript-promise-async-await/
  - https://ko.javascript.info/async

## 요구사항 스펙문서

### 아이템 조회
```http
# Request
GET /api/items

# Response
[
  { "idx": 1, "content": "todo item1", "completed": true, "createdAt": 1625484597770 },
  { "idx": 2, "content": "todo item2", "completed": false, "createdAt": 1625484600000 },
  { "idx": 3, "content": "todo item3", "completed": false, "createdAt": 1625484712340 }
]
```

### 아이템 추가
```http
# Request
POST /api/items
Content-Type: application/json

{
  "content": "새로운 Todo Item"
}
```

### 아이템 내용 수정
```http
# Request
# 1번 아이템의 내용을 수정
PUT /api/items/1
Content-Type: application/json

{
  "content": "새로운 Todo Item"
}
```

### 아이템 토글
```http
# Request
# 1번 아이템을 토글
PUT /api/items/toggle/1
Content-Type: application/json
```

### 아이템 삭제
```http
# Request
# 1번 아이템을 삭제
DELETE /api/items/1
Content-Type: application/json
```

## fetch 사용 방법
```js
// 아이템 조회
fetch('/api/items')
  .then(response => response.json())
  .then(items => console.log(items));

// 아이템 추가
const addConfig = {
  method: 'post',
  headers: { 'content-type': 'application/json' },
  body: JSON.stringify({ content: "새로운 Todo Item" }),
}
fetch('/api/items', appendConfig)
  .then(response => response.json())
  .then(items => console.log(items));

// 아이템 수정
const updateConfig = {
  method: 'put',
  headers: { 'content-type': 'application/json' },
  body: JSON.stringify({ content: "새로운 Todo Item" }),
}
fetch('/api/items/1', updateConfig)
  .then(response => response.json())
  .then(items => console.log(items));

// 아이템 토글
fetch('/api/items/1/toggle', { method: 'put' })
  .then(response => response.json())
  .then(items => console.log(items));

// 아이템 삭제
fetch('/api/items/1', { method: 'delete' })
  .then(response => response.json())
  .then(items => console.log(items));
```