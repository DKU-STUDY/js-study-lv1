// src/js/lib.js
// ES6 모듈
export const pi = Math.PI;

export function power(x, y) {
  // ES7: 지수 연산자
  return x ** y;
}

// ES6 클래스
export class Foo {
  // stage 3: 클래스 필드 정의 제안
  #private = 10;

  foo() {
    // stage 4: 객체 Rest/Spread 프로퍼티
    const { a, b, ...x } = { ...{ a: 1, b: 2 }, c: 3, d: 4 };
    return { a, b, x };
  }

  bar() {
    return this.#private;
  }
}