# 2주차: TodoList 리팩토링 + 번들링

## 📣 요구사항

- [ ] 리팩토링
  - [ ] ECMAScript에 대한 조사
    - [ ] ECMAScript, Javascript 용어 정리
    - [ ] ES5 vs ES6 차이점 정리
  - [ ] 파일을 기능 단위로 분리해본다.
    - [ ] core: 어플리케이션의 베이스 코드
    - [ ] components: 컴포넌트 코드
    - [ ] utils: 유틸리티 성향의 코드
    - [ ] constants: 상수
    - [ ] app.js (entry point)
  - [ ] 다음과 같은 규칙을 지켜가며 코딩한다.
    - [ ] 한 메소드(함수)에 indent(tab)는 최대 2depth로 유지하기
    - [ ] else 예약어(keyword)를 쓰지 않는다.
    - [ ] 모든 원시값과 문자를 포장(wrap)한다.
    - [ ] 한 줄에 점을 하나만 찍는다.
    - [ ] 줄여쓰지 않는다 (축약 금지)
- [ ] 번들러 조사 및 적용
  - [ ] 번들러에 대해 알아보기
    - [ ] javascript 번들링
    - [ ] 번들링을 하는 이유, 필요한 이유
    - [ ] 번들러로 할 수 있는 일들
  - [ ] 번들러 종류 알아보기
    - [ ] parcel
    - [ ] webpack
    - [ ] rollup
    - [ ] vite
  - [ ] 모듈 시스템에 대해 알아보기
    - [ ] CommonJS
    - [ ] AMD
    - [ ] RequireJS
    - [ ] ESM
  - [ ] 브라우저 모듈에 대해 알아보기
  - [ ] 번들러 적용
    - [ ] Parcel, Webpack, Rollup, Vite 중 택 1
  
## 코딩 규칙 예시

### 한 메소드(함수)에 indent(tab)는 최대 2depth로 유지하기



### else 예약어(keyword)를 쓰지 않는다.
### 모든 원시값과 문자를 포장(wrap)한다.
### 한 줄에 점을 하나만 찍는다.
### 줄여쓰지 않는다 (축약 금지)

## 번들러 관련 자료
- [모듈화의 역사](https://medium.com/@chullino/%EC%9B%B9%ED%8C%A9-3-4-js%EB%AA%A8%EB%93%88%ED%99%94-%EC%97%AD%EC%82%AC-%EB%8F%8C%EC%95%84%EB%B3%B4%EA%B8%B0-1-9df997f82002)
- [module](https://gitlab.com/siots-study/topics/-/wikis/module)
- [모듈 소개](https://ko.javascript.info/modules-intro)
- [babel과 webpack을 이용한 ES6 환경 구축](https://poiemaweb.com/es6-babel-webpack-1)