# 2주차: 번들러 조사 및 적용(webpack, parcel)

## 📣 요구사항
- [ ] To Do List 만들기

- [X] 번들러 조사
  - [X] 번들이란 무엇인가?
    모듈 번들러: 웹 구성 자원(Javascript, HTML, CSS, Image등)을 모두 각각의 모듈로 보고 조합해서 합친 결과물 만드는 도구
    
  - [X] 번들을 하는 이유는?
    효율성
      코드가 길어질수록 겹치는 네임스페이스가 많아질 수 있으나, 모듈로 분리하면 X
      똑같은 코드를 반복하지 않고, 필요할 때마다 불러서 사용 가능

  - [X] 모듈 시스템에 대해 알아보기
      분리된 파일 각각(module)의 구성: 클래스 하나 + 함수들
      export, import하는 코드에도 차이가 있음.

    - [X] CommonJS
      Node.js 서버를 위해 만들어진 모듈 시스템.
      모든 파일이 로컬 디스크에 있어 필요할 때 바로 불러올 수 있는 상황이 전제.
      자바스크립트를 브라우저 밖으로 꺼내기 위해 탄생.

    - [X] AMD
      가장 오래된 모듈 시스템 (라이브러리: require.js)
      모든 모듈을 모두 로딩하지 않는 비동기 모듈 로딩방식.
      종속 여부와 상관없이 파일 하나씩 로드.
      
    - [X] RequireJS
      AMD API 명세 구현체 중 하나
      다른 모듈을 사용하기 위해 globals가 필요 없음.
      디스크 파일당 하나의 모듈 정의만 있어야함.

    - [X] ESM
      ECMAScript에서 지원하는 자바스크립트 공식 모듈 시스템
      모듈 지정자에 변수를 넣을 수 없으며, export는 참조를 반환하는 함수를 정의.

    - [X] 브라우저 모듈
      HTML 페이지가 모두 나타난 다음에, 모듈이 실행됨

  - [X] 번들러 종류
    - [X] parcel
      간단한 것을 개발하는데 적절.
      구성 파일이 전펴 힐요 없고, Parcel 빌드만 실행하면 됨.

    - [X] webpack
      정적 모듈 번들러 중 하나
      import, export를 위한 node polyfills 부재.
      이미지, third-party imports 등을 위한 광범위한 지원 제공.

    - [X] rollup
      ES 모듈에 초점을 맞추며, 별도의 라이브러리에서의 개별 기능 결합 가능.
      import, export를 위한 node polyfills 존재함.

    - [X] vite
      bunding이나 compiling 없이 실행 가능해서 빠름.

- [X] 번들러 적용
  - [X] 번들러 설치를 위해 nodejs + npm 설치
  - [X] Parcel, Webpack, Rollup, Vite 중 택 1
    https://helloinyong.tistory.com/81 참고하여 webpack 설치

## 번들러 관련 자료
- [모듈화의 역사](https://medium.com/@chullino/%EC%9B%B9%ED%8C%A9-3-4-js%EB%AA%A8%EB%93%88%ED%99%94-%EC%97%AD%EC%82%AC-%EB%8F%8C%EC%95%84%EB%B3%B4%EA%B8%B0-1-9df997f82002)
- [module](https://gitlab.com/siots-study/topics/-/wikis/module)
- [모듈 소개](https://ko.javascript.info/modules-intro)
- [babel과 webpack을 이용한 ES6 환경 구축](https://poiemaweb.com/es6-babel-webpack-1)
