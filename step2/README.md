# 2주차: 번들러 조사 및 적용(webpack, parcel)

## 📣 요구사항

[ ] 번들러 조사
### 번들이란 무엇인가?
![bundle](https://joshua1988.github.io/webpack-guide/assets/img/webpack-bundling.e79747a1.png)
웹 애플리케이션을 구성하는 몇십, 몇백개의 자원들을 하나의 파일로 병합 및 압축 해주는 동작을 모듈 번들링이라고 한다. 

빌드, 번들링, 변환 이 세 단어는 모두 같은 의미이다.

### 번들을 하는 이유는?
1. 파일단위의 자바스크립트 모듈 관리
    - 자바스크립트 변수 유효범위는 기본적으로 전역 범위를 갖기 때문에 변수이름을 모두 기억하지 않는 
    이상 변수를 중복 선언하거나 의도치 않은 값으로 할당할 수 있다. 
2. 웹 개발 작업 자동화 도구 
    - 프런트엔드 개발 업무를 할 때 가장 많이 반복해야 하는 작업은 텍스트 편집기에서 코드를 수정하고 저장한 뒤
    브라우저에서 새로 고침을 누르는 것이었습니다. 이 외에도 웹 서비스를 개발하고 웹 서버에 배포할 때 아래와 같은 작업들을 해야 했습니다.
        - HTML, CSS, JS압축
        - 이미지 압축
        - CSS 전처리기 변환
    - 이러한 일들을 자동화 해주는 도구들이 필요했습니다. 그래서 Grunt 와 Gulp 같은 도구들이 등장했습니다. 
3. 웹 애플리케이션의 빠른 로딩 속도와 높은 성능
    - 브라우저에서 서버로 요청하는 파일 숫자를 줄이기 위해, 파일들을 압축하고 병합하는 작업들을 수행한다.
    - 초기 로딩속도를 높이기 위해, 웹팩은 기본적으로 필요한 자원은 미리 로딩하는게 아니라 
     그 때 요청하자는 철학(Lazy Loading) 을 갖고 있습니다.  

### 모듈 시스템에 대해 알아보기
#### CommonJS
로컬디스크에서 모듈을 로드할 때 사용한다. 

자바스크립트를 서버사이드에서 사용하고자 하는 목적으로 ServerJS 가 설립되었고,
이후에 자바스크립트를 범용적으로 사용하고자 하는 목적으로 CommonJS 로 이름이 변경되었다. 

브라우저에서는 파일 스코프가 없기 때문에 여전히 전역 스코프가 오염된다. 
CommonJS 의 require 는 Sync flow 함수이다. 
- 디스크에서는 속도가 빠르기 때문에 non blocking 으로 동작한다.
- 브라우저에서는 필요한 모듈을 내려받기 전까지는 브라우저가 block 이 된다.

####  AMD Asynchronous Module Definition
비동기 모듈에 대한 표준안을 다룬다.
- 브라우저에서 네트워크를 통해 모듈을 내려받는데 더 간결하고 빠른 코드를 제공하기 위함이다.
- event loop 의 non-blocking, async 를 적극활용한다.
- RequireJS 는 AMD 형식의 모듈 용 로더이다. 
- 동적로딩, 의존성 관리, 모듈화를 지원한다.

#### RequireJS
```javascript
/* js/foo.js */
// 모듈 정의의 기본 형태
define([ // 의존 모듈들을 나열한다. 모듈이 한 개라도 배열로 넘겨야 한다.  
    'js/util',
    'js/Ajax',
    'js/Event'
], function (util, Ajax, Event) { // 의존 모듈들은 순서대로 매개변수에 담긴다.
    // 의존 모듈들이 모두 로딩 완료되면 이 함수를 실행한다.
    // 초기화 영역
    var i = 0;

    function increase() {
        i++;
    }

    function get() {
      return i;
    }

    // 외부에 노출할 함수들만 반환한다.
    return {
        increase: increase,
        get: get
    };
});

/* js/main.js */
require([  
    'js/foo'
], function (foo) {
    console.log(foo.get()); // 0
    foo.increase();
    console.log(foo.get()); // 1
});
```
의존 모듈은 배열 순서에 상관없이 병렬로 네트워크를 통해 다운로드 되거나 브라우저 캐시에서 꺼내진다. 

#### ESM ES6 Module
ESM 동적으로 import, export 할 수 없다.
Webpack 과 같은 번들링 도구에서 정적으로 import 와 export 구문을 분석하고
사용하지 않는 코드를 제외시키는 방법으로 최적화 한다. 

ESM 은 모듈 로더를 비동기 환경에서 실행한다. 먼저 가저온 스크립트는 바로 실행하지 않고,
import 와 export 구문을 찾아서 스크립트를 파싱한다. 파싱단계에서 실제로 ESM 로더는 종속성이 있는 코드를
실행하지 않고도, named imports 에 있는 오타를 감지하여 에러를 발생시킬 수 있다.

그 다음 ESM 모듈 로더는 가져온 스크립트를 비동기로 다운로드하여 파싱한 다음, import 된 스크립트를 가져오고,
더 이상 import 할 것이 없어질 때까지 import 를 찾은 다음 dependencies 의 모듈 그래프를 만들어 낸다. 
그리고, 스크립트는 실행될 준비를 마치게 되며, 그 스크립트에 의존하고 있는 스크립트들도 실행할 준비를 마치게 되고, 마침내 실행된다.
[(스크립트는 잡큐에 등록된다.)](https://eyabc.github.io/docs/javascript/asynchronous_programming/JOBS)

ESM 모듈 내의 모든 자식 스크립트들은 병렬로 다운로드 되지만, 실행은 순차적으로 진행된다.

#### 브라우저 모듈
`<script type="module">` 스크립트가 모듈이라는 것을 속성을 통해 명시해야 한다. 
- 모듈 스크립트는 항상 지연 실행된다.(HTML 처리가 완료된 후 스크립트가 실행된다.)

`<script async type="module">`
- defer 와 같이 HTML 처리와 병렬적으로 스크립트가 로딩 된다.
- 스크립트 로딩이 끝나면, HTML 문서나 다른 스크립트가 로드되길 기다리지 않고 바로 실행된다.
- 광고, 문서 레벨 이벤트 리스너, 카운터 등 어디에도 종속되지 않는 기능을 구현할 때 유용하다.

`호환을 위한 'nomodule'`
구식 브라우저
- type="module" 을 해석하지 못하여, 무시하고 넘어간다.
- nomodule 을 해석한다.

### 번들러 종류
#### parcel
1. 빠른 번들
    - Parcel은 워커 프로세스를 이용하여 멀티코어 컴파일을 가능케 하고, 
    심지어 재시작 후라 해도 빠른 리빌드를 할 수 있도록 파일시스템 캐시를 갖고 있습니다.
3. 자동 변환
    - 필요하다면 Babel, PostCSS, PostHTML을 사용하는 코드는 자동으로 변환됩니다. 심지어 node_modules까지도.
4. 설정 없는 코드 분할
    - Parcel은 동적 import()문을 사용해서 출력 번들을 분할 할 수 있습니다. 이를 통해 초기 로드시 필요한 것들만 로드할 수 있습니다.
5. 빠른 모듈 교체(HMR)
    - Parcel은 설정 없이 자동으로 개발중의 변화를 갱신하여 브라우저에 나타냅니다.
6. 친절한 에러 로그
    - Parcel은 오류 발생시 도움이 되도록 문제를 정확히 집어주는 구문 강조 코드 프레임을 출력합니다.
      
- 벤치마크

    | 번들러	| 시간 |
    |---|---|
    | browserify |	22.98초 |
    | webpack	| 20.71초 | 
    | parcel |	9.98초 |
    | parcel - 캐시 사용 | 2.64초 |
    
    
> 워커 프로세스(Worker Process)는 클라이언트와 실제로 통신을 하며 사용자의 요구 사항을 처리하는 프로세스이다

#### webpack


#### rollup


#### vite


### 번들러 적용
- [ ] 번들러 설치를 위해 nodejs + npm 설치
- [ ] Parcel, Webpack, Rollup, Vite 중 택 1

## 번들러 관련 자료
- [모듈화의 역사](https://medium.com/@chullino/%EC%9B%B9%ED%8C%A9-3-4-js%EB%AA%A8%EB%93%88%ED%99%94-%EC%97%AD%EC%82%AC-%EB%8F%8C%EC%95%84%EB%B3%B4%EA%B8%B0-1-9df997f82002)
- [module](https://gitlab.com/siots-study/topics/-/wikis/module)
- [모듈 소개](https://ko.javascript.info/modules-intro)
- [babel과 webpack을 이용한 ES6 환경 구축](https://poiemaweb.com/es6-babel-webpack-1)

- https://joshua1988.github.io/webpack-guide/webpack/what-is-webpack.html#%EC%9B%B9%ED%8C%A9%EC%97%90%EC%84%9C%EC%9D%98-%EB%AA%A8%EB%93%88
- https://eyabc.github.io/docs/javascript/module/JS%20%EB%AA%A8%EB%93%88%EC%9D%98%20%EB%B3%80%ED%99%94
- https://d2.naver.com/helloworld/591319
- https://eyabc.github.io/docs/javascript/module/%EB%B8%8C%EB%9D%BC%EC%9A%B0%EC%A0%80%20%EB%AA%A8%EB%93%88
- https://ko.parceljs.org/
- https://technet.tmaxsoft.com/upload/download/online/tibero/pver-20150504-000001/tibero_admin/chapter_intro.html
