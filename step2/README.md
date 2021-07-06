# 2주차: TodoList 리팩토링 + 번들링

## 📣 요구사항

- [x] 리팩토링
  - [x] ECMAScript에 대한 조사
    - [x] ECMAScript, Javascript 용어 정리
    - [x] ES5 vs ES6 차이점 정리
  - [ ] 파일을 기능 단위로 분리해본다.
    - [ ] core: 어플리케이션의 베이스 코드
    - [ ] components: 컴포넌트 코드
    - [x] utils: 유틸리티 성향의 코드
    - [ ] constants: 상수
    - [x] app.js (entry point)
  - [x] 다음과 같은 규칙을 지켜가며 코딩한다.
    - [x] 한 메소드(함수)에 indent(tab)는 최대 2depth로 유지하기
    - [x] else 예약어(keyword)를 쓰지 않는다.
    - [x] 상수를 적극적으로 사용한다.
    - [x] 한 줄에 점을 하나만 찍는다.
    - [x] 줄여쓰지 않는다 (축약 금지)
- [x] 번들러 조사 및 적용
  - [x] 번들러에 대해 알아보기
  - [x] javascript 번들링
  - [x] 번들링을 하는 이유, 필요한 이유
  - [x] 번들러로 할 수 있는 일들
  - [x] 번들러 종류 알아보기
    - [x] parcel
    - [x] webpack
    - [x] rollup
    - [x] vite
  - [x] 모듈 시스템에 대해 알아보기
    - [x] CommonJS
    - [x] AMD
    - [x] RequireJS
    - [x] ESM
  - [ ] 브라우저 모듈에 대해 알아보기
  - [x] 번들러 적용
    - [x] 번들러 설치를 위해 nodejs + npm 설치
    - [x] Parcel, Webpack, Rollup, Vite 중 택 1

## 파일 분리 예시

- [Vanilla Javascript로 컴포넌트 만들기](https://junilhwang.github.io/TIL/Javascript/Design/Vanilla-JS-Component/)
- 사실 위의 포스트만 볼 경우 굉장히 혼란스러울 수 있다.
- 이 부분은 온라인 세션에서 설명할 예정

## 코딩 규칙 예시

참고링크

- [객체지향 생활 체조 학습하기](https://7942yongdae.tistory.com/8)
- [[Java] 객체지향 생활 체조 원칙 9가지 (from 소트웍스 앤솔러지)](https://jamie95.tistory.com/99)

### 한 메소드(함수)에 indent(tab)는 최대 2depth로 유지하기

- 한 함수에 들여쓰기가 여러 개 존재한다면, 해당 함수는 여러가지 일을 하고 있을 가능성이 높다.
- 함수가 맡은 일이 적을수록(잘게 쪼갤수록), 재사용성이 높고 디버깅도 용이하다.

```js
function 단웅이_10번씩_5줄_반복() {
  let str = "";
  const raw = 10;
  const repeat = 5;
  for (let i = 0; i < raw; i++) {
    for (let j = 0; j < repeat; j++) {
      str += "단웅이";
      str += " ";
    }
    str += "\n";
  }
  return str;
}
```

위의 코드를 다음과 같이 표현할 수 있다.

```js
function 단웅이_10번씩_5줄_반복() {
  const raw = 10;
  const repeat = 5;
  return 단웅이_줄바꿈_반복(raw, repeat);
}

function 단웅이_줄바꿈_반복(raw, repeat) {
  let str = "";
  for (let i = 0; i < raw; i++) {
    str += 단웅이_반복(repeat);
    str += "\n";
  }
  return str;
}

function 단웅이_반복(repeat) {
  let str = "";
  for (let i = 0; i < repeat; i++) {
    str += "단웅이 ";
  }
  return str;
}
```

다시 위의 코드는 `Array`와 `Map`을 이용하여 다음과 같이 표현할 수 있다.

```js
function 단웅이_10번씩_5줄_반복() {
  const raw = 10;
  const repeat = 5;
  return 단웅이_줄바꿈_반복(raw, repeat);
}

function 단웅이_줄바꿈_반복(raw, repeat) {
  return Array(repeat).fill(단웅이_반복(repeat));
}

function 단웅이_반복(repeat) {
  return Array(repeat).fill("Jamie ");
}
```

### else 예약어(keyword)를 쓰지 않는다.

- 조건문은 복제의 원인이 되기도 하며 가독성도 좋지 않다.
- 참고링크: https://woowacourse.github.io/javable/post/2020-07-29-dont-use-else/

```js
function 단웅이의_일과(hour, isStudy) {
  let status = "";
  if (hour > 4 && hour <= 12) {
    status = "취침";
  } else {
    if (isStudy) {
      status = "공부";
    } else {
      status = "여가";
    }
  }
  return status;
}
```

위의 코드는 다음과 같이 표현할 수 있다.

```js
function 단웅이의_일과(hour, isStudy) {
  if (hour > 4 && hour <= 12) {
    return "취침";
  }
  if (isStudy) {
    return "공부";
  }
  return "여가";
}
```

다시 다음과 같이 표현할 수 있다.

```js
function 단웅이의_일과(hour, isStudy) {
  if (hour > 4 && hour <= 12) {
    return "취침";
  }
  return isStudy ? "공부" : "여가";
}
```

이것도 다시 이렇게 표현할 수 있다.

```js
function 단웅이의_일과(시간, 공부중) {
  const 취침시간 = 4 < hour && hour <= 12;
  return 취침시간 ? "취침" : 공부중 ? "공부" : "여가";
}
```

그런데 사실 마지막 케이스의 경우 호불호가 조금 있는 편이다.

### 상수를 적극적으로 사용한다.

앞선 경우를 예로 들자면 다음과 같다.

```js
const 취침 = "취침";
const 공부 = "공부";
const 여가 = "여가";
function 단웅이의_일과(hour, isStudy) {
  if (hour > 4 && hour <= 12) {
    return 취침;
  }
  return isStudy ? 공부 : 여가;
}
```

혹은 다음과 같이 표현할 수 있다.

```js
const 단웅이의_상태 = {
  취침: 취침,
  공부: 공부,
  여가: 여가,
};

function 단웅이의_일과(hour, isStudy) {
  if (hour > 4 && hour <= 12) {
    return 단웅이의_상태.취침;
  }
  return isStudy ? 단웅이의_상태.공부 : 단웅이의_상태.여가;
}
```

여기서 `4`와 `12`도 상수로 만들 수 있다.

```js
const 단웅이의_상태 = {
  취침: 취침,
  공부: 공부,
  여가: 여가,
};
const 취침_시간 = {
  시작: 4,
  끝: 12,
};

function 단웅이의_일과(hour, isStudy) {
  if (취침_시간.시작 < hour && hour <= 취침_시간.끝) {
    return 단웅이의_상태.취침;
  }
  return isStudy ? 단웅이의_상태.공부 : 단웅이의_상태.여가;
}
```

작성하고 보니 단웅이녀석 이상한 시간에 자고 있다.

### 한 줄에 점을 하나만 찍는다.

이 부분은 순수하게 가독성을 위함입니다.

```js
function 랜덤_숫자_100개_만들기() {
  return Array(100)
    .fill(0)
    .map(() => Math.random())
    .map((v) => v * 100)
    .map(Math.round);
}
```

위에 처럼 된 코드를 다음과 같이 표현합시다.

```js
function 랜덤_숫자_100개_만들기() {
  return Array(100)
    .fill(0)
    .map(() => Math.random())
    .map((v) => v * 100)
    .map(Math.round);
}
```

혹은

```js
function 랜덤_숫자_100개_만들기() {
  return Array(100)
    .fill(0)
    .map(() => Math.random())
    .map((v) => v * 100)
    .map(Math.round);
}
```

### 줄여쓰지 않는다 (축약 금지)

- 길게 설명하지 않겠다.
- 아니, 내가 설명하지 않겠다.
- [이 포스트](https://velog.io/@mowinckel/%EB%88%84%EA%B0%80-%EC%9D%B4%EB%A6%84%EC%9D%84-%ED%95%A8%EB%B6%80%EB%A1%9C-%EC%A7%93%EB%8A%94%EA%B0%80)로 대체한다.

## 번들러 관련 자료

- [모듈화의 역사](https://medium.com/@chullino/%EC%9B%B9%ED%8C%A9-3-4-js%EB%AA%A8%EB%93%88%ED%99%94-%EC%97%AD%EC%82%AC-%EB%8F%8C%EC%95%84%EB%B3%B4%EA%B8%B0-1-9df997f82002)
- [module](https://gitlab.com/siots-study/topics/-/wikis/module)
- [모듈 소개](https://ko.javascript.info/modules-intro)
- [babel과 webpack을 이용한 ES6 환경 구축](https://poiemaweb.com/es6-babel-webpack-1)

## ECMAscript, JAVAscript

- ECMA-262는 Ecma 인터내셔널에 의해 제정된 하나의 기술 규격의 이름으로, 범용 목적의 스크립트 언어에 대한 명세를 담고 있다.
- 스크립트 언어는 독립된 시스템에서 작동하도록 특별히 설계된 프로그래밍 언어로, 응용 프로그램과는 독립적이며, 사용자가 직접 프로그램을 의도에 따라 동작시킬 수 있다는 특징이 있다.
- ECMAscript란 ECMA-262 규격에 의해 정의된 범용 스크립트 언어를 말하며, JAVAscript은 이에 포함된다.

## ES5, ES6

- ECMAscript가 배포된 버전이 ES5, ES6 등이며 ES6부터는 숫자 대신 연도를 붙여 ECMA2015(=ES6)같은 명칭을 사용한다.
- ES5에서 ES6로 넘어오면서 let, const, Class, Arrow function 및 module import/export 등이 도입되었다.

## 번들링이란

- 번들링을 이해하기 위해선 우선 모듈(Module)을 알아야 한다.
- 모듈(Module)이란 유지보수 및 가독성의 향상을 위해 프로그램의 기능별로 각각의 파일들을 구성하는 것이다.
- 그러나 이렇듯 세분화된 모듈 파일이 늘어날 수록 네트워크의 코스트는 늘어날 수 밖에 없다. 웹 환경은 발전하는 컴퓨터의 성능과 관계없이 요청과 응답으로 이루어져 있기 때문에 파일이 늘어나면 늘어날 수록 요청과 응답에 걸리는 시간도 그에 비례하기 때문이다.
- 따라서 우리는 모듈화된 파일 구조는 유지하면서도 지정한 단위로 파일들을 하나로 만들어서 요청에 대한 응답으로 전달할 수 있는 환경을 만들어주는 것이 필요하고, 이를 수행하는 것이 바로 번들러(Bundler)이다. 대표적인 번들러로는 Webpack, Rollup, Parcel 등이 있으며, 이들은 서로 연관성 있는 여러 파일(모듈)들을 하나의 번들 파일로 묶어주는 역할을 한다. 여기에는 JS파일 뿐만 아니라 다양한 타입의 파일들이 포함된다. 또한 그 외에도 사용자 환경 최적화를 위한 다양한 기능들을 수행한다.
- 대표적인 번들러인 Webpack을 예로 들자면 Webpack은 production 모드를 사용시 코드 난독화, 압축, 최적화 작업을 지원하기도 하며, Webpack의 주요 구성 요소 중 하나인 로더(Loader)는 일부 브라우저에서 지원이 되지 않는 ES6 형식의 자바스크립트 파일을 ES5로 변환하여 사용가능하게 한다.

## 번들러 비교

- Parcel: parcel은 별도의 설정파일 없이 다양한 변환을 지원한다는 것이 강점이다. 또한 원하는 파일만을 부분적으로 Bundle할 수 있는 기능이 있어서 Webpack보다 간단하게 사용이 가능하다. 또한 코드 최적화 기능인 Tree Shaking 기능에 있어서 ES6과 CommonJS를 둘 다 지원한다.

- Webpack: Webpack의 경우 기본적인 input과 output파일이 아닌 abel, SCSS, etc와 같은 것을 필요로 한다면 config.파일을 통해서 설정을 해줘야한다 . 하지만 오래된 만큼 생태계가 푼부하고 안전성이 뛰어나며, 서드파티 imports, 이미지 파일, CSS 등을 폭넓게 지원한다.

- Rollup: Rollup은 ES6을 기본으로 따르기 때문에, ES6 모듈 형식으로 빌드 결과물을 출력할 수 있고 이를 라이브러리나 패키지에 활용할 수 있다는 장점이 있다.

## 모듈 시스템

- CommonJS – CommonJS는 2009년 V8엔진을 근간으로 하는 nodeJS가 등장하면서 이를 위해 서버사이드 언어로 개발 서버를 위해 만들어진 모듈 시스템이다. CommonJS 이전에는 제대로된 모듈화 기법이 없었지만, CommonJS가 모듈화의 중요 요건들(모듈마다 독립적인 스코프 유지, 모듈 의존성 관리, 함수 export/import) 를 충족시키면서 모듈화 기법의 토대가 마련되었다고 할 수 있다. 하지만 서버사이드를 위해 만들어졌기 때문에 line by line으로 함수를 실행하는 blocking 방식을 채용하였고, 이에 따라 당시 등장한 V8엔진의 비동기성(async, await)을 활용한 동시성을 활용할 수 없는 한계가 있었다. 즉 웹 브라우저 환경에서의 속도가 느리다는 단점이 있다.

- AMD- AMD는 하드웨어 컴퍼니 AMD가 아니라 Asynchronous Module Definition, 즉 비동기성 모듈 정의의 줄임말이다. 이름에서부터 알 수 있듯이, 이 시스템은 크롬 v8엔진의 비동기성(async) 환경을 활용하여 모듈들을 async하게 올릴 수 있었고, 이에 따라 웹 환경에 최적화가 가능하였다.

- requreJS란 AMD에 기반한 모듈 로더이다. 모듈 로더는 런타임에 모듈을 가져오기 위한 목적을 가진

- ESM은 ES6에서 제안된 자바스크립트 자체 모듈 시스템이다. script 태그에 type="module"을 선언하게 되면 자바스크립트 파일은 모듈로 동작하게 된다. 이전의 모듈 시스템들의 장점들을 채택한 시스템으로, CJS의 문법을 차용하였지만 AMD처럼 비동기적으로 로드가 가능하다. 하지만 아직 많은 브라우저에서 모듈 시스템을 지원하지 않기 때문에 번들러를 사용하여 이를 보완한다.
