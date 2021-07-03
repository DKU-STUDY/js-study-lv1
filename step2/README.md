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
    - [ ] parcel
    - [ ] webpack
    - [ ] rollup
    - [ ] vite
  - [ ] 모듈 시스템에 대해 알아보기
    - [X] CommonJS
    - [X] AMD
    - [ ] RequireJS
    - [ ] ESM
  - [ ] 브라우저 모듈에 대해 알아보기
  - [X] 번들러 적용
    - [X] 번들러 설치를 위해 nodejs + npm 설치
    - [X] Parcel, Webpack, Rollup, Vite 중 택 1

## ECMA Script
- ECMA Script(또는 ES)는 Ecma International이 ECMA 262 기술 규격에 따라 정의하고 있는 표준화된 스크립트 프로그래밍 언어를 말함.
- ECMA script는 스크립트언어가 준수해야하는 규칙, 세부 사항 등을 제공함.
- javascript는 ECMA script사양을 준수하는 스크립트 언어
- ECMA Script 6는 ECMA-262 표준의 6번째 개정판 문서에 있는 표준 스펙으로 ES2015라고도 불림(2015년에 나와서). 보통 ES6는 이전에 사용하던 표준인 ES5와 비교해서 2배이상 내용이 많아져서 많이들 ES6라고 부른다.
- ES5와 다른 ES6의 내용들을 몇가지 나타내면 벡틱(`)을 활용한 템플릿 리터럴이 가능하다는 것(위 코드가 ES5, 아래 코드가 ES6)

# ES5
```js
var name = "찬휘";
var age = 25;
console.log('저의 이름은 " ' + name + ' "이고, 나이는 ' + age + "살 입니다.");
//  저의 이름은 "찬휘"이고, 나이는 25살 입니다.
```

# ES6
```js
let name = "찬휘";
let age = 25;
console.log(`저의 이름은 ${name}이고, 나이는 ${age}살 입니다.`);
//  저의 이름은 "찬휘"이고, 나이는 25살 입니다.
```

- arrow function 사용

# ES5
```js
var str = function(arg1, arg2) {
  console.log("찬휘");
};
```

# ES6
```js
var str = (arg1,arg2) => {
  console.log("찬휘");
}
```

- 기존 var 변수외에 const, let사용 가능(const는 상수선언이 되어 내용 변경이안됨, let은 블록 단위 스콥을 가짐)
- class 키워드 사용가능

# ES5
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

# ES6

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

-이외에도 import, export를 이용한 모듈화 등등..

## 번들러

- 번들러는 먼저 모듈화로부터 시작된다. javascript초기에는 다음과 같은 방식으로 로드를 해왔다.

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
사용문법은 다음과 같다.

```js
module.exports = foo;

// 모듈 사용
const foo = require("./foo");
```

CommonJs는 애초에 브라우저 외에 환경에서도 동작하는 javascript를 위한 모듈 시스템이라 모든 의존성이 로컬에 존재해서 모듈을 바로 사용할 수 있는 환경을 전제로 한다. export, require은 직관적이고 간단한 문법이지만 비동기 방식보다 느리고 임포트는 되었지만 사용되지 않은 코드를 분석, 삭제하는 기술인 트리쉐이킹이 어려운 단점도 명확했다. 그렇지만 초창기 javascript에 모듈 시스템은 반드시 필요했고 javascript 런타임인 node js는 CommonJS방식의 명세를 채택하고 구현했다. nodeJs는 성장했고 javasript또한 규모가 커졌다. 이로 인해 CommonJS의 모듈 시스템의 사용 빈도 역시 높아졌지만 브라우저에서는 CommonJS를 사용할 수 없다는 문제가 있었다. 그래서 브라우저에서도 사용 가능한 빌드 도구인 browserify가 생겼다.

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

문법은 비교적 복잡하지만 비동기적으로 모듈을 호출하는 특성 때문에 퍼포먼스는 CommonJs보다 성능이 우수했다. AMD는 브라우저 서버사이드 모두 호환되는 방식이기도 하다.