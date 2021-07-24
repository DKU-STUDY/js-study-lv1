# 4주차: API 연동

Step2에서 작업한 내용과 Step3에서 작업한 내용을 합치는 과정

- [X] 사전 조사
  - [X] AJAX란?
  - [X] XMLHttpRequest API
  - [X] Fetch API
  - [X] CORS
  - [X] Promise, async, await
- [X] API 연동하기
  - [X] 번들러로 빌드 하기
  - [X] 빌드한 HTML/CSS/JS를 Server와 연동하기
  - [X] fetch api를 이용하여 html에서 server 데이터 가져오기
  
## AJAX

- Asynchronous Javascript And Xml
- 자바스크립트를 이용해 서버와 브라우저가 비동기 방식으로 데이터를 교환할 수 있는 통신 기능
- 브라우저가 가지고 있는 XMLHttpRequest 객체를 이용해서 전체 페이지를 리로드하지 않고 필요한 데이터만 받아 갱신하는 기법
- 웹 페이지의 속도를 향상시키고, 자원과 시간을 아낄 수 있다는 장점이 있다.

## XMLHttpRequest API

- 현재 대부분의 주요 웹 브라우저는 서버에 데이터를 요청하기 위한 XMLHttpRequest 객체를 내장하고 있다.
- AJAX의 가장 핵심적인 구성 요소로, AJAX에서 웹 브라우저가 서버와 데이터를 교환할 때 사용된다.
- 이 객체를 사용하면 웹 페이지가 전부 로딩된 후에도 서버에 데이터를 요청하거나 서버로부터 데이터를 전송받을 수 있다.

## Fetch API

- 서버와 비동기 통신을 하는 방식 중 하나로, 네트워크 요청을 쉽게 활용할 수 있도록 해준다.
- Fetch API를 사용하면 페이지의 새로고침 없이 서버와 데이터를 주고 받을 수 있게 된다.

## CORS

- 교차 출처 리소스 공유(Cross-Origin Resource Sharing, CORS)는 추가 HTTP 헤더를 사용하여, 한 출처에서 실행 중인 웹 애플리케이션이 다른 출처의 선택한 자원에 접근할 수 있는 권한을 부여하도록 브라우저에 알려주는 체제이다.
- CORS는 브라우저와 서버 간의 안전한 교차 출처 요청 및 데이터 전송을 지원한다.

## Promise, async, await

- Promise는 자바스크립트 비동기 처리에 사용되는 객체이다.
  - 비동기 처리란 특정 코드의 실행이 완료될 때까지 기다리지 않고 다음 코드를 먼저 수행하는 자바스크립트의 특성
- async, await은 자바스크립트의 비동기 처리 패턴 중 가장 최근에 나온 문법이다.
  - async, await은 비동기 처리에 대한 코드의 가독성을 향상시켜주고, 유지보수가 좀 더 편리한 코드를 작성할 수 있도록 해준다.
  

## 사전 조사에 대한 참고 링크

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
