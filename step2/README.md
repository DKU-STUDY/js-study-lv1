# 2주차: TodoList 리팩토링 + 번들링

## 📣 요구사항

- [ ] 리팩토링
  - [X] ECMAScript에 대한 조사
    - [X] ECMAScript, Javascript 용어 정리
    - [X] ES5 vs ES6 차이점 정리
  - [ ] 파일을 기능 단위로 분리해본다.
    - [ ] core: 어플리케이션의 베이스 코드
    - [ ] components: 컴포넌트 코드
    - [ ] utils: 유틸리티 성향의 코드
    - [ ] constants: 상수
    - [X] app.js (entry point)
  - [ ] 다음과 같은 규칙을 지켜가며 코딩한다.
    - [X] 한 메소드(함수)에 indent(tab)는 최대 2depth로 유지하기
    - [X] else 예약어(keyword)를 쓰지 않는다.
    - [ ] 상수를 적극적으로 사용한다.
    - [X] 한 줄에 점을 하나만 찍는다.
    - [X] 줄여쓰지 않는다 (축약 금지)
- [ ] 번들러 조사 및 적용
  - [ ] 번들러에 대해 알아보기
    - [ ] javascript 번들링
    - [X] 번들링을 하는 이유, 필요한 이유
    - [ ] 번들러로 할 수 있는 일들
  - [ ] 번들러 종류 알아보기
    - [X] parcel
    - [X] webpack
    - [X] rollup
    - [ ] vite
  - [ ] 모듈 시스템에 대해 알아보기
    - [X] CommonJS
    - [X] AMD
    - [ ] RequireJS
    - [X] ESM
  - [ ] 브라우저 모듈에 대해 알아보기
  - [X] 번들러 적용
    - [X] 번들러 설치를 위해 nodejs + npm 설치
    - [X] Parcel, Webpack, Rollup, Vite 중 택 1

## ECMA Script
- ECMA Script(또는 ES)는 Ecma International이 ECMA 262 기술 규격에 따라 정의하고 있는 표준화된 스크립트 프로그래밍 언어를 말함.
- ECMA script는 스크립트언어가 준수해야하는 규칙, 세부 사항 등을 제공함.
- javascript는 ECMA script사양을 준수하는 스크립트 언어
- ECMA Script 6는 ECMA-262 표준의 6번째 개정판 문서에 있는 표준 스펙으로 ES2015라고도 불림(2015년에 나와서). 보통 ES6는 이전에 사용하던 표준인 ES5와 비교해서 2배이상 내용이 많아져서 많이들 ES6라고 부른다.
- ES5와 다른 ES6의 내용들을 몇가지 나타내면 벡틱(`)을 활용한 템플릿 리터럴이 가능하다는 것

# ES5 
```js
var name = "찬휘";
var age = 25;
console.log('저의 이름은 " ' + name + ' "이고, 나이는 ' + age + "살 입니다.");
//  저의 이름은 "찬휘"이고, 나이는 25살 입니다.
```

# ES6 템플릿 리터럴
```js
let name = "찬휘";
let age = 25;
console.log(`저의 이름은 ${name}이고, 나이는 ${age}살 입니다.`);
//  저의 이름은 "찬휘"이고, 나이는 25살 입니다.
```
# ES5 함수 선언 중 1개 방식
```js
var str = function(arg1, arg2) {
  console.log("찬휘");
};
```

# ES6 arrow function
```js
var str = (arg1,arg2) => {
  console.log("찬휘");
}
```

# ES5 var 변수 선언
```js
var Add = function(arg1, arg2) {
  this.arg1 = arg1;
  this.arg2 = arg2;
};

Add.prototype.calc = function() {
  return this.arg1 + "+" + this.arg2 + "=" + (this.arg1 + this.arg2);
};

var num = new Add(5, 8);
console.log(num.calc()); // 5 + 8 = 13
```

# ES6 let, const 변수 선언

```js
class Add {
  constructor(arg1, arg2) {
    this.arg1 = arg1;
    this.arg2 = arg2;
  }
  calc() {
    return this.arg1 + "+" + this.arg2 + "=" + (this.arg1 + this.arg2);
  }
}

var num = new Add(5, 8);
console.log(num.calc()); // 5 + 8 = 13
```

-이외에도 import, export를 이용한 모듈화 등등이 추가되었다.

## 번들러

- 번들러를 논하기 전에 모듈로부터 이야기를 시작하겠다. javascript초기에는 다음과 같은 방식으로 로드를 해왔다.

```html
<html>
  <script src="/src/foo.js"></script>
  <script src="/src/bar.js"></script>
  <script src="/src/baz.js"></script>
  <script src="/src/qux.js"></script>
  <script src="/src/quux.js"></script>
</html>
```

이 방법은 스크립트를 로드한 전역 컨텍스트에서 모듈간의 충돌이 발생한다는 문제가 있었다. 예를들어, foo.js, bar.js에 이름이 같은 변수가 있다면 파일이 제대로 동작하지 않을 가능성이 있다.(ES 6이전에는 let const 변수도 없었으니 파일 규모가 커졌으면 관리가 상당히 힘들었을 듯...) 이런 일을 방지하기 위해 다른 모듈의 변수이름이 겹치지 않으면서도 모듈 로드 순서를 지정하는데 많은 시간이 필요했다는 의미다. 그리고 node js같이 서버측에서도 자바스크립트가 사용되기 시작하면서 모듈화에 대한 중요성이 더 커졌다.

여기서 등장한것이 CommonJS, AMD 이다.

# CommonJs 

```js
module.exports = foo;

// 모듈 사용
const foo = require("./foo");
```

위 코드는 CommonJs를 사용한 코드이다. CommonJs는 애초에 브라우저 외에 환경에서도 동작하는 javascript를 위한 모듈 시스템이라 모든 의존성이 로컬에 존재해서 모듈을 바로 사용할 수 있는 환경을 전제로 한다. export, require은 직관적이고 간단한 문법이지만 비동기 방식보다 느리고 임포트는 되었지만 사용되지 않은 코드를 분석, 삭제하는 기술인 트리쉐이킹이 어려운 단점도 명확했다. 그렇지만 초창기 javascript에 모듈 시스템은 반드시 필요했고 javascript 런타임인 node js는 CommonJS방식의 명세를 채택하고 구현했다. nodeJs는 성장했고 javasript또한 규모가 커졌다. 이로 인해 CommonJS의 모듈 시스템의 사용 빈도 역시 높아졌지만 브라우저에서는 CommonJS를 사용할 수 없다는 문제가 있었다. 그래서 브라우저에서도 사용 가능한 빌드 도구인 browserify가 생겼다.

# AMD

AMD는 비동기 상황에서도 javascript 모듈을 사용하기 위해 commonJs에서 함께 논의하다 합의점을 이루지 못하고 독립한 별도의 그룹이다.

아래는 문법이다.
```js

// 모듈 정의
define([
  'jquery',
  'underscore',
  // 의존 모듈들을 배열로 나열
], function ($, _) {
  // 의존 모듈들은 순서대로 매개변수에 담김

  return {
    // 외부에 노출할 함수들만 반환
  };
});

// 모듈 사용
require([
  ...
  // 사용할 모듈 배열로 나열
], function (...) {
  // 사용할 모듈들이 순서대로 매개변수에 담김
});
```

문법은 비교적 복잡하지만 비동기적으로 모듈을 호출하는 특성 때문에 퍼포먼스는 CommonJs보다 성능이 우수했다. AMD는 브라우저 서버사이드 모두 호환되는 방식이기도 하다. AMD 명세로 구현된 모듈 로더 라이브러리로 RequireJS가 있다.

# ES6 모듈

ES6에서 javascript 표준 모듈 시스템이 명세되었다. 이에 따라 ES6 module이라고 부른다. 사실 javascript 모듈에 대해서는 이전에 문제가 많아서 이런 문제를 해결하기위해 많은 노력이 있었으며 그 대표적인 결과물이 ES6라고 생각하도 된다. 문법이 간단하고 정적 분석(코드를 실행 안하고 분석하는 기법)이 가능해서 트리쉐이킹 역시 쉽게 가능해졌다는 특징이 있다.

# 드디어 번들러

모듈화에서 시작되어서 ES6 Module까지 얘기를 정말 간추려서 했다. 여기서 설명할 번들러라는 것은 javascript 모듈을 브라우저에서 실행할 수 있는 프론트앤드 개발도구이다. 번들러를 통해 단일 javascript파일로 만들어진다. 번들러를 이용하는 이유는 모든 브라우저가 모듈 시스템을 완전히 지원 안하기 때문에 그렇고 코드 종속성 관계를 관리하는데 도움을 주며 이미지, css 에셋등을 로드하는데 도움이 되어 사용한다. 이런 장점외에도 사용하지 않는 코드를 제거하는 등의 최적화 작업의 필요성도 높아져서 더욱더 각광받기 시작했다.

# webpack

웹팩은 안정성이 뛰어나고 오래된 번들러이다. 개발 변경 중에 새로고침 기능인 라이브 리로딩이나 새로고침 없이 브라우저 모듈을 업데이트하는 HMR(Hot module replacement)기능이 대표적이다. 기본적으로 webpack-dev-server 플러그인만 설치하면 동작해서 간단하다. (롤업이나 파셀은 특정상황에서는 동작하지 않을 때도 있다.) 다만 웹팩도 트리쉐이킹을 지원하지만 commonJS 방식으로 모듈을 로드한 부분을 ES6 문법으로 교체해아하고 package.josn 파일에 별도의 플래그 설정, 여러 플러그인을 설치해아하는 약간의 번거로움이 있긴하다.

# rollup

롤업은 웹팩과 유사하지만 큰 차이점은 ES6 모듈 형식으로 빌드 결과물을 출력할 수 있어서 이를 라이브러리, 패키지에 활용할 수 있다는 것이다. 웹펙, 파셀을 자체 로더가 있지만 롤업은 ES6를 기본으로 따르기 때문이다. 이에 따라 코드 스플리팅에서 강점을 보인다. 특히 중복 제거에  특화되어있는데 entry point가 여러개일 때 더 장점이 두드러진다. 롤업은 진입점이 달라서 중복으로 번들 될 수 있는 부분을 알아내고 독립된 모듈로 분리해 낼 수 있다.

# parcel

파셀은 별도의 설정 파일 없이도 동작한다(zero config라고 함). 설치만 하면 별도의 설정을 건드리지 않고 빌드 명령어로 바로 사용 할 수 있다. 파셀은 웹팩과 달리 javascript 엔트리포인트를 지정해주는게 아닌, HTML파일 자체를 읽기 때문이다. HTML 파일을 순차적으로 읽어나가면서 직접 참조한다. 여러 장점이 있지만 내용이 어려워서 생략합니다.... 단점은 안정성이 떨어지고 아직 많이 알려지지 않았다고 한다.