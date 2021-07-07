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
  
## NodeJS에 대한 개념

- Node.js는 Chrome V8 Javascript 엔진으로 빌드된 Javascript 런타임이다. -> 자바스크립트 실행 환경
- 이벤트 기반으로 개발이 가능하며, Non-Blocking I/O를 지원하기 때문에 비동기식 프로그래밍이 가능하다. -> I/O 부하가 심한 대규모 서비스를 개발하기 적합
- 내장 HTTP 서버 라이브러리를 포함하고 있어 웹 서버에서 아파치 등의 별도의 소프트웨어 없이 동작하는 것이 가능하다.
- Node.js는 자바스크립트 표준라이브러리 프로젝트인 CommonJS의 스펙을 따르고 있다.

## Javascript와 NodeJS의 공통점 차이점

### 공통점

- Javascript와 NodeJS는 모두 ECMAScript라는 Spec을 사용한다.

### 차이점

- Javascript는 프로그래밍 언어이지만 NodeJS는 브라우저 밖의 자바스크립트 런타임이다.
- Javascript는 client에 대한 개발을 하는 것으로, browser, document 등을 다룰 수 있다. 반면 NodeJS는 server를 다룰 수 있으며, browser, document 등을 다룰 수 없다.
- Javascript는 Javascript Core(Safari), Spider monkey(FireFox), V8(Google Chrome) 등의 엔진에서 실행될 수 있지만 NodeJS는 V8 엔진에서만 실행될 수 있다.

## RESTful, RESTAPI 등에 대해 조사하기

### REST

- REST는 "Representational State Transfer" 의 약자로, HTTP URI(Uniform Resource Identifier)를 통해 자원(Resource)을 명시하고, HTTP Method(POST, GET, PUT, DELETE)를 통해 해당 자원에 대한 CRUD Operation을 적용하는 것을 의미한다.

- REST 구성 요소
  - 자원(Resource): URI
    - 모든 자원에는 고유한 ID가 존재하고, 이 자원은 Server에 존재한다.
    - 자원을 구별하는 ID는 ‘/item/:seq’와 같은 HTTP URI이다.  
    - Client는 URI를 이용해서 자원을 지정하고, 해당 자원의 상태에 대한 조작을 Server에 요청한다.
  - 행위(Verb): HTTP Method
    - 서버에 요청을 보내기 위한 방식으로 GET, POST, PUT, PATCH, DELETE가 있다.
  - 표현(Representation of Resource)
    - Client와 Server가 데이터를 주고 받는 형태로 JSON, XML, TEXT, RSS 등이 있다.

- REST 특징
  - Server-Client Architecture(서버 클라이언트 구조)
    - 자원이 있는 쪽이 Server, 자원을 요청하는 쪽인 Client의 구조를 가진다.
    - Server는 API를 제공하고 비즈니스 로직 처리 및 저장을 책임진다.
    - Client는 사용자 인증이나 context(세션, 로그인 정보) 등을 직접 관리하고 책임진다.
    - Server와 Client 간의 의존성이 줄어들게 된다.
  - Stateless(무상태성)
    - Client의 context를 서버에 저장하지 않는다.
    - session과 cookie 등을 별도로 관리하지 않아도 되기 때문에 구현이 단순해진다.
  - Cahceable(캐시 처리 가능)
    - REST는 HTTP 프로토콜을 그대로 사용하기 때문에 HTTP가 가진 캐싱 기능을 적용할 수 있다.
    - HTTP 프로토콜 표준에서 사용하는 Last-Modified 태그나 E-Tag를 이용하면 캐싱 구현이 가능하다.
  - Layered System(계층화)
    - Client 입장에서는 REST API Server만 호출한다.
    - REST Server는 다중 계층으로 구성될 수 있다. 예를 들어 API Server는 순수 비즈니스 로직을 수행하고, 그 앞단에 보안, 로드밸런싱, 암호화, 사용자 인증 등을 추가하여 구조상의 유연성을 줄 수 있다.

- REST의 장점
  - HTTP 프로토콜 인프라를 그대로 사용하므로 별도의 인프라를 구축할 필요가 없다.
  - 서버와 클라이언트의 역할을 명확하게 분리한다.
  - REST API 메세지가 의도하는 바를 명확하게 나타내므로 의도하는 바를 쉽게 파악할 수 있다.

- REST의 단점
  - REST는 HTTP 메소드를 이용하여 URI를 표현하는데, 사용할 수 있는 메소드 형태가 제한적이다.
  - 표준이 존재하지 않는다. 즉, 공식화된 API 디자인 가이드가 존재하지 않는다.

### RESTful

- RESTful은 일반적으로 REST라는 아키텍처를 구현하는 웹 서비스를 나타내기 위해 사용되는 용어이다.
- RESTful의 목적
  - 이해하기 쉽고 사용하기 쉬운 REST API를 만드는 것
  - RESTful한 API를 구현하는 근본적인 목적이 성능 향상에 있는 것이 아니라 API의 이해도 및 호환성을 높이는 것이기 때문에 성능이 중요한 상황에서는 굳이 RESTful한 API를 구현할 필요는 없다.

### REST API

- REST API는 REST를 기반으로 API를 구현한 것이다.
- REST API 설계 가이드
  - URI는 정보의 자원을 표현해야 하고, 자원에 대한 행위는 HTTP Method(GET, POST, PUT, DELETE)로 표현해야 한다.
    - 리소스명은 동사보다는 명사를 사용해야 하고, delete와 같은 행위에 대한 표현이 들어가면 안된다.
    ```http
    GET /items/delete/1  (x)
    DELETE /items/1      (o)  
    ```
    
    - 계층 관계를 나타낼 때는 슬래시 구분자(/)를 사용한다.
    ```http
    http://example.com/animals/mammals/whales
    ```
    
    - URI 마지막 문자로 슬래시(/)를 포함하지 않는다.
    ```http
    http://example.com/animals/mammals/whales/ (x)
    http://example.com/animals/mammals/whales  (o)
    ```
    
    - 하이픈(-)은 URI 가독성을 높이는 데 사용한다.
    - 밑줄(_)은 가독성을 저하시키므로 URI에 사용하지 않는다.
    - URI 경로에 대문자 사용을 피해야 한다. -> 대문자에 따라 다른 리소스로 인식되기 때문
    - 파일 확장자는 URI에 포함시키지 않는다.
  
## express.js에 대한 개념

- Express.js는 Node.js의 핵심 모듈인 http와 Connect 컴포넌트를 기반으로 하는 웹 프레임워크이다.
- Express.js는 웹 애플리케이션을 만들기 위한 각종 라이브러리와 미들웨어 등이 내장되어 있어 빠르고 손쉽게 개발할 수 있도록 해준다.

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

