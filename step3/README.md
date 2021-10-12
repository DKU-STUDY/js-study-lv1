# 3주차: node.js + express.js + REST API + ajax

## 요구사항

- [ ] 사전 조사
  - [ ] node.js에 대한 개념 (3문장 요약)
  - [ ] express.js 대한 개념 (3문장 요약)
  - [ ] Javascript와 NodeJS의 공통점/차이점 (3문장 요약)
  - [ ] RESTful, RESTAPI 등에 대해 조사하기 (5문장 요약)
  - [ ] AJAX란? (3문장 요약)
  - [ ] CORS (3문장 요약)
- [ ] 기능구현
  - [ ] REST API 구현
    - [ ] CRUD(Create, Read, Update, Delete)
      - [ ] 아이템 조회
      - [ ] 아이템 추가
      - [ ] 아이템 내용 수정
      - [ ] 아이템 토글
      - [ ] 아이템 삭제
    - [ ] 데이터를 저장할 수 있는 형태로 관리한다.
      - [ ] 파일시스템(json) or MySQL or MongoDB 중 택 1
  - [ ] 서버에서 HTML 불러오기
    - [ ] static middleware를 이용
  - [ ] fetch를 사용하여 API 연동하기
  
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