# 3주차: ExpressJS로 API 서버 만들기

## 요구사항

- [x] 사전 조사
  - [x] NodeJS에 대한 개념 (간략히)
  - [x] Javascript와 NodeJS의 공통점/차이점
  - [x] RESTful, RESTAPI 등에 대해 조사하기
  - [x] express.js에 대한 개념 (간략히)
- [x] 기능구현
  - [x] 아이템 조회
  - [x] 아이템 추가
    - [x] 아이템을 추가할 때 자유롭게 고유 ID를 계산해서 저장한다.
  - [x] 아이템 내용 수정
  - [x] 아이템 토글
  - [x] 아이템 삭제
  - [x] 데이터를 저장할 수 있는 형태로 관리한다.
    - [x] 파일시스템(json) or MySQL or MongoDB 선택

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
