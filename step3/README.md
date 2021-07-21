# 3주차: ExpressJS로 API 서버 만들기

## 요구사항

- [X] 사전 조사
  - [X] NodeJS에 대한 개념 (간략히)
  - [X] Javascript와 NodeJS의 공통점/차이점
  - [X] RESTful, RESTAPI 등에 대해 조사하기
  - [X] express.js에 대한 개념 (간략히)
- [X] 기능구현
  - [X] 아이템 조회
  - [X] 아이템 추가
    - [X] 아이템을 추가할 때 자유롭게 고유 ID를 계산해서 저장한다. 
  - [X] 아이템 내용 수정
  - [X] 아이템 토글
  - [X] 아이템 삭제
  - [X] 데이터를 저장할 수 있는 형태로 관리한다.
    - [X] 파일시스템(json) or MySQL or MongoDB 선택
  
## 사전조사에 대한 참고링크

- NodeJS
  
  - Node.js는 서버사이드 자바스크립트로 구글의 자바스크립트 엔진인 V8을 기반으로 구성된 소프트웨어이다. 비동기식 프로그래밍이 가능하며 자바스크립트 런타임이 기존에는 브라우저에서만 이뤄졌다면 Nodejs이후로는 서버에서도 자바스크립트가 사용됐다는 점에서 자바스크립트 사용이 더 많아졌다고 볼 수 있다. 웹 서버를 구동함에 있어서 JSP를 이용하면 아파치 등의 별도 소프트웨어가 필요하지만 Node.js는 내장 HTTP 서버 라이브러리를 가지고 있어서 이런 과정이 생략된다. 또한 기존에는 클라이언트에서 request할 때 요청마다 쓰레드를 생성하는 방식이어서 서버에 과부하가 있었지만 Node.js는 단일 쓰레드가 이벤트 루프 기반 방식이어서 요청을 받고 다른 작업을 하다가 먼저 요청한 작업이 끝나면 이벤트를 받아 응답을 보내는 방식으로 이뤄진다. 그래서 서버 부하가 적다.

- Node.js와 javascript 공통점 차이점
  
  - Node.js와 javascript 모두 ECMAscript 표준을 따른다. 
  
  - 위에서 언급한것처럼 Node.js는 자바스크립트 런타임이다. 즉, 자바스크립트를 실행할 수 있는 환경이며 서버를 구동하는데 자바스크립트를 사용할 수 있도록 해준다. 반면, 자바스크립트는 클라이언트 환경에서 이뤄지는 동작을 나타내는데 사용되며 node.js에서는 document에 접근이 안되고 javascript에서는 http와 같은 서버단에서 일어나는 코드를 작성할 수 없다.

- REST 

  - REST란 Representational State Transfer의 약자이다. 이는 world wide web(www)와 같은 분산 하이퍼미디어 시스템을 위한 개발 아키텍쳐의 한 형식이다. HTTP 프로토콜을 활용하며 URI를 통해 자원을 나타내고 HTTP method(POST, GET 등)에 대한 CRUD operation을 적용하는 것을 의미한다. REST는 server-client 구조로 되어있고, stateless이다. Stateless란 클라이언트의 정보를 서버단에서 저장하지 않는다(따라서, 세션이나 쿠키 필요). 또한, Cacheable이라고 해서 웹 표준 HTTP 프로토콜을 사용해서 웹에서 사용하는 기존 인프라를 활용할 수 있다. 이외에도 계층화(layered System), Code-on-Demand 특성이 있다. REST를 잘 갖춘 웹서비스에 대해 RESTful이라고 한다.

  - API는 Application Programming Interface의 줄임말로 데이터와 기능의 집합을 제공하여 컴퓨터 프로그램 간의 상호작용을 촉진하며, 정보를 교환 가능 하도록 하는 것이다. REST 기반으로 서비스 API를 구현한 것을 REST API라고 한다.

- Express.js

  - Express.js는 Node.js의 모듈인 http와 connect를 기반으로 하는 웹 프레임워크이다. 이런 것을 미들웨어라고 한다. Express를 통해서 쉽게 서버를 구성할 수 있다고 생각하면 된다. Node.JS에서 서버를 만들 때 사용되는 클래스나 라이브러리들을 express로 모아두었다고 생각하면 되겠다.

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

