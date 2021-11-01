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

### webpack vs rollup vs parcel
#### Configuration
Configuration을 이야기했을 때, 세 번들러중 가장 튀는 것은 Parcel입니다. 
Parcel은 config파일을 가지고 있지 않습니다.

Webpack도 config파일 없이 가능하지만, 
옵션들을 사용하고자하면 config파일을 필요로합니다.

Rollup은 상대경로를 지원하지만, 
Webpack은 지원하지 않습니다. 
따라서 path.resolve , path.join 등을 사용합니다.

#### Transformations
Javascript이외의 파일을 처리하기 위해서는 Javascript 형식으로 파일을 변환한 후, 
Bundler로 전달해야 합니다.

Webpack에서는 babel-loader, css-loader와 같이 loader를 사용합니다.

Rollup은 플러그인을 사용합니다.

Parcel은 별도의 설정파일 없이 다양한 변환을 지원합니다.

#### Tree Shaking
Tree shaking을 통해 얼마나 Dead code를 지울 수 있는지는 아래의 사이트에서 확인하실 수 있습니다. 
(https://github.com/mischnic/tree-shaking-example )

주로 Pacel과 Rollup이 좋은 성과를 내는 것을 보실 수 있습니다. 각 번들러의 특징은 다음과 같습니다.

Webpack은 Tree Shaking을 ES6 모듈에서만 지원을 합니다. 
그리고 package.json 파일에 "sideEffects" 항목을 필요로합니다. 
그리고 UglifyJS와 같은 minimize tool도 필요로합니다.

Rollup은 기본적으로 코드를 정적으로 분석하고 실제로 사용하지 않는 것을 제외합니다. 
기존도구와 모듈을 기반으로 빌드가 가능합니다.

Parcel은 ES6모듈, CommonJS모듈 모두에서 Tree Shaking을 지원합니다. 
CommonJS를 사용하는 코드에서 효과적입니다. 
또한 대부분의 작업을 캐싱하여 다시 빌드할경우 빠른 속도를 보여줍니다.

#### Dev Server
Webpack은 webpack-dev-server 를 제공합니다. 이는 live-reload를 지원합니다.

Rollup은 개발서버를 위해 rollup-plugin-serve 를 제공합니다. 
live-reload를 위해서는 추가로 rollup-plugin-livereload 를 설치해야합니다.

Parcel 에는 개발서버가 내장되어있고 파일을 변경할경우, 다시 빌드합니다.

#### Hot Module Replacement
Hot Module Replacement는 코드가 실행되는 동안 전체 리로드를 할 필요없이 모듈을 추가 제거할 수 있는 기능을 이야기합니다.

Webpack은 webpack-dev-server 의 hot 모드를 통해 지원합니다.

Rollup에서는 지원하지 않습니다.

Parcel은 기본적으로 HMR을 지원합니다.

### 결론
Webpack, Rollup, Parcel 이 3가지 Bundler를 Bundler가 가지고 있는 기능들에 따라 비교를 해보았습니다.
 각 Bundler를 어느경우에 사용해야할지를 생각해보았을 때, 각각의 장점과 단점에 따라 다릅니다.

저는 Webpack을 선호할 것 같습니다. 다양한 플러그인과 로더를 통해 개발자에게 광범위한 지원을 해주고 오랜기간 발전한만큼 사용법에 대한 레퍼런스가 많습니다.

Parcel은 소규모로 Toy 프로젝트를 진행하거나 Bundler 설정에 많은 시간을 할애할 수 없는 경우 사용하는 것을 추천합니다.

Rollup은 Tree Shaking과 같이 효율성을 고려하는 프로젝트에 추천합니다. 
하지만 다른 번들러에서 쉽게했던 작업들을 위해 많은 플러그인을 필요로할 수 있습니다.

파셀은 기본적으로 지원하는 설정들이 많다. 대신 웹팩은 커스텀의 자유도가 높다. 

#### vite
VITE는 네이티브 ES 모듈을 지원하는 웹 개발 툴입니다. Vue.js 3.0 이상과 동작하게 설계 되었고 번들 시에는 Rollup.js를 사용하여 프로덕션 빌드를 제공합니다. 

빠른 콜드 서버 스타트

번들링을 수행하지 않고 서버 콜드 스타트가 매우 빠릅니다.
인스턴트 HMR (hot module replacement)

vue.js 코드는 수정 후 저장하면 HMR 되면서 바로 변경된 사항을 볼 수 있습니다. VITE는 HMR할 때 변경된 모듈만 교체하므로 프로그램의 크기에 상관없이 HMR이 일관되게 빠릅니다.

진정한 온-디맨드 방식

코드는 온-디맨드 방식으로 컴파일 됩니다. 그래서 실제로 보여지는 현재 화면만 컴파일 됩니다. 전체 앱이 번들링될 때까지 기다릴 필요가 없어서 프로젝트의 크기가 클 경우 더 효과적인 방식입니다.

Full Page Load 시에는 기존의 vue-cli 보다 느릴 수 있다.
아직 CSS Preprocessor 의 HMR 을 지원하지 않는다.

Vite는 번들과정이 없다고 말하는데 
이는 Modern 브라우저에서 사용할 수 있는 Script Tag의 type=module을 사용함으로써 
가능하다고 한다. 그러나 이는 IE와 같은 브라우저에서는 사용하지 못하여 
추가적인 작업이 필요하게 된다.
 
IE11 지원 관련해서 많은 이야기가 오고 갔다.
결국 vite-plugin-legacy 를 사용하는 것이 해결방안으로, 
한 개발자분이 해당 플러그인을 업데이트 해주시면서 끝이나는 듯했다.

### prefetch, preload, preconnect
https://beomy.github.io/tech/browser/preload-preconnect-prefetch/

### 번들러 적용
- [x] 번들러 설치를 위해 nodejs + npm 설치
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
- https://sambalim.tistory.com/137
- https://marrrang.tistory.com/10
- https://snyung.com/content/2020-12-20--Preact%20Vite%20%EC%9D%BC%EC%A3%BC%EC%9D%BC%20%EC%82%AC%EC%9A%A9%ED%9B%84%EA%B8%B0

