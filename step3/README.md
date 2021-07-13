# 3주차: ExpressJS로 API 서버 만들기

## 요구사항

- [ ] 사전 조사
  - [ ] NodeJS에 대한 개념 (간략히)
  - [ ] Javascript와 NodeJS의 공통점/차이점
  - [ ] RESTful, RESTAPI 등에 대해 조사하기
  - [ ] express.js에 대한 개념 (간략히)
- [ ] 기능구현
  - [ ] 아이템 조회
  - [ ] 아이템 추가
    - [ ] 아이템을 추가할 때 자유롭게 고유 ID를 계산해서 저장한다.
  - [ ] 아이템 내용 수정
  - [ ] 아이템 토글
  - [ ] 아이템 삭제
  - [ ] 데이터를 저장할 수 있는 형태로 관리한다.
    - [ ] 파일시스템(json) or MySQL or MongoDB 선택

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

## 요구사항 스펙문서

- NodeJs란 크롬 V8 자바스크립트 엔진으로 빌드된 자바스크립트 런타임이다. 애초에 자바스크립트 런타임이 브라우저 밖에 존재하질 않았지만, Node.js는 브라우저 없이도 자바스크립트가 확장될 수 있게 해주었다. 런타임이란 프로그래밍언어가 구동되는 환경을 얘기하는 것으로 Node.js는 REPL(Read, Eval, Print, Loop)을 통해서 런타임을 제공한다. 이러한 REPL은 Babel REPL의 경우 웹에서 제공해하고, Node.js에서는 윈도우의 CMD, 맥의 터미널 등등에서 제공을 해준다.
- 정확히 표현하자면, Node.js는 자바스크립트를 다루는 것이 아니라 자바스크립트의 Spec을 사용하는 ECMAScript를 다룬다.
  자바스크립트는 독립적인 언어가 아니라 스크립트 언어로써 웹 브라우저 안에서만 동작할 수 있기 때문에 client 개발을 위한 용도로만 국한되었지만, Node.js는 터미널 프로그램 등에서 브라우저 없이도 실행할 수 있어 파일 시스템을 이용할 수도 있고, 서버를 만들거나 크롤링을 할 수도 있다. 즉, 자바스크립트는 client를 다룰 수 있지만 Node.js는 불가능 하며, 반대로 Node.js는 server를 다룰 수 있지만 자바스크립트는 불가능하다.
- REST란 "Representational State Transfer"의 약자로써, 자원을 표현으로 구분하여 해당 자원의 상태를 주고받는 것을 의미한다. 즉 웹의 기술과 HTTP 프로토콜을 활용한 아키텍쳐 스타일의 일종이다. HTTP URI를 통해 자원을 명시하고, HTTP Method(POST,GET,PUT,DELETE)를 통해 해당 자원에 대한 CRUD Operation을 명시하는 것을 말한다. REST는 자원 기반의 구조 설계의 중심에 Resource가 있고, HTTP Method를 통해 Resource를 처리하도록 설계된다.
- REST API란 REST를 기반으로 서비스 API를 구현한 것이다. REST는 HTTP 표준을 기반으로 구현하므로, HTTP를 지원하는 프로그램 언어인 자바, C#, 웹 등을 이용해 클라이언트, 서버를 구현할 수 있다.
  -RESTful이란 일반적으로 REST라는 아키텍쳐를 구현하는 웹 서비스를 나타내기 위해 사용되는 용어로, REST 원리를 따르는 시스템은 RESTful이란 용어로 지칭된다. RESTful의 목적은 이해하기 쉽고 사용하기 쉬운 REST API를 만드는 것으로, 근본적인 목적이 성능 향상에 있는 것이 아니라 일관적인 컨벤션을 통한 API의 이해도 및 호환성을 높이는 것이 주 동기이니, 성능이 중요한 상황에서는 굳이 RESTful한 API를 구현할 필요는 없다

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
