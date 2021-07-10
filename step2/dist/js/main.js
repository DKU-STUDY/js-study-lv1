"use strict";

var _lib = require("./lib.js");

// src/js/main.js
// ES6 모듈
console.log(_lib.pi);
console.log((0, _lib.power)(_lib.pi, _lib.pi));
var f = new _lib.Foo();
console.log(f.foo());
console.log(f.bar());