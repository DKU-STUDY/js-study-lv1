# 4주차: API 연동

Step2에서 작업한 내용과 Step3에서 작업한 내용을 합치는 과정

- [x] 사전 조사
  - [x] AJAX란?
  - [x] XMLHttpRequest API
  - [x] Fetch API
  - [x] CORS
  - [x] Promise, async, await
- [x] API 연동하기
  - [x] 번들러로 빌드 하기
  - [x] 빌드한 HTML/CSS/JS를 Server와 연동하기
  - [x] fetch api를 이용하여 html에서 server 데이터 가져오기

## 사전 조사

1. AJAX란?
   Ajax(Asynchronous JavaScript and XML, 에이잭스)는 비동기적인 웹 애플리케이션의 제작을 위해 아래와 같은 조합을 이용하는 웹 개발 기법이다.

- 표현 정보를 위한 HTML (또는 XHTML) 과 CSS
- 동적인 화면 출력 및 표시 정보와의 상호작용을 위한 DOM, 자바스크립트
- 웹 서버와 비동기적으로 데이터를 교환하고 조작하기 위한 XML, XSLT, XMLHttpRequest (Ajax 애플리케이션은 XML/XSLT 대신 미리 정의된 HTML이나 일반 텍스트, JSON, JSON-RPC를 이용할 수 있다).

2. XMLHttpRequest API
   현재 대부분의 주요 웹 브라우저는 서버에 데이터를 요청하기 위한 XMLHttpRequest 객체를 내장하고 있다.
   XMLHttpRequest 객체는 서버로부터 XML 데이터를 전송받아 처리하는 데 사용된다.
   이 객체를 사용하면 웹 페이지가 전부 로딩된 후에도 서버에 데이터를 요청하거나 서버로부터 데이터를 전송받을 수 있다. 즉, 웹 페이지 전체를 다시 로딩하지 않고 일부분만을 갱신할 수 있다.

3. Fetch API
   자바스크립트를 사용하면 필요할 때 서버에 네트워크 요청을 보내고 새로운 정보를 받아오는 일을 할 수 있다.
   네트워크 요청은 다음과 같은 경우에 이뤄진다.

- 주문 전송
- 사용자 정보 읽기
- 서버에서 최신 변경분 가져오기

4. CORS
   교차 출처 리소스 공유(Cross-origin resource sharing, CORS), 교차 출처 자원 공유는 웹 페이지 상의 제한된 리소스를 최초 자원이 서비스된 도메인 밖의 다른 도메인으로부터 요청할 수 있게 허용하는 구조이다. 웹페이지는 교차 출처 이미지, 스타일시트, 스크립트, iframe, 동영상을 자유로이 임베드할 수 있다. 특정한 도메인 간(cross-domain) 요청, 특히 Ajax 요청은 동일-출처 보안 정책에 의해 기본적으로 금지된다.

CORS는 교차 출처 요청을 허용하는 것이 안전한지 아닌지를 판별하기 위해 브라우저와 서버가 상호 통신하는 하나의 방법을 정의한다. 순수하게 동일한 출처 요청보다 더 많은 자유와 기능을 허용하지만 단순히 모든 교차 출처 요청을 허용하는 것보다 더 안전하다. CORS의 사양은 원래 W3C 권고안으로 출판되었으나 해당 문서는 구식(obsolete)인 상태이다. 현재 CORS를 정의하면서 활발히 유지보수된 사양은 WHATWG의 Fetch Living Standard이다.

5. Promise, async, await
   Promise는 자바스크립트 비동기 처리에 사용되는 객체이다. 여기서 자바스크립트의 비동기 처리란 ‘특정 코드의 실행이 완료될 때까지 기다리지 않고 다음 코드를 먼저 수행하는 자바스크립트의 특성’을 의미한다.

async와 await는 자바스크립트의 비동기 처리 패턴 중 가장 최근에 나온 문법이다. 기존의 비동기 처리 방식인 콜백 함수와 프로미스의 단점을 보완하고 개발자가 읽기 좋은 코드를 작성할 수 있게 도와준다.

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
