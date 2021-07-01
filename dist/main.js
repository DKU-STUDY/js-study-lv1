/*!
 * 
 *         Build Date: 2021. 7. 1. 오후 1:47:08
 *         Commit Version: 2efc03a
 *
 *         Author: SM
 *
 *
 */
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./step1/src/app.js":
/*!**************************!*\
  !*** ./step1/src/app.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _service_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./service.js */ \"./step1/src/service.js\");\n\r\n\r\n(0,_service_js__WEBPACK_IMPORTED_MODULE_0__.render)();\r\n\n\n//# sourceURL=webpack://js-study-lv1/./step1/src/app.js?");

/***/ }),

/***/ "./step1/src/components/item.js":
/*!**************************************!*\
  !*** ./step1/src/components/item.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"item\": () => (/* binding */ item)\n/* harmony export */ });\n/* harmony import */ var _service_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../service.js */ \"./step1/src/service.js\");\n\r\n\r\nconst BLUE = '#09F';\r\n\r\nconst item = (item, index) => {\r\n  if (index === _service_js__WEBPACK_IMPORTED_MODULE_0__.state.selectedItem) {\r\n    return /*html*/ `\r\n        <li>\r\n        <form name=\"modifierForm\" action=\"\">\r\n            <fieldset>\r\n            <legend hidden>아이템 수정</legend>\r\n            <label>\r\n                <span hidden>아이템 수정</span>\r\n                <input type=\"text\" value=\"${item.content}\" size=\"40\">\r\n            </label>\r\n            <button type=\"submit\">완료</button>\r\n            <button type=\"button\" class=\"canceler\">취소</button>\r\n            </fieldset>\r\n        </form >\r\n        </li>\r\n        `;\r\n  }\r\n  return /*html*/ `\r\n    <li>\r\n        <p ${item.isComplete ? `style=\"color: ${BLUE}\"` : ''}>${item.content}</p>\r\n        <input\r\n        type=\"checkbox\"\r\n        class=\"complete\" ${item.isComplete ? 'checked' : ''}\r\n        data-key = \"${index}\"\r\n        />\r\n        <button type=\"button\" class=\"modifier\" data-key=\"${index}\">수정</button>\r\n        <button type=\"button\" class=\"deleter\" data-key=\"${index}\">삭제</button>\r\n    </li>\r\n    `;\r\n};\r\n\n\n//# sourceURL=webpack://js-study-lv1/./step1/src/components/item.js?");

/***/ }),

/***/ "./step1/src/service.js":
/*!******************************!*\
  !*** ./step1/src/service.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"state\": () => (/* binding */ state),\n/* harmony export */   \"render\": () => (/* binding */ render)\n/* harmony export */ });\n/* harmony import */ var _template_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./template.js */ \"./step1/src/template.js\");\n/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils.js */ \"./step1/src/utils.js\");\n\r\n\r\n\r\nconst state = {\r\n  todoItems: [\r\n    { id: 1, content: '첫 번째 아이템', isComplete: false, createAt: Date.now() },\r\n    { id: 2, content: '두 번째 아이템', isComplete: true, createAt: Date.now() },\r\n    { id: 3, content: '세 번째 아이템', isComplete: false, createAt: Date.now() }\r\n  ],\r\n  selectedItem: -1\r\n};\r\n\r\nconst addItem = (e) => {\r\n  e.preventDefault();\r\n  const content = e.target.querySelector('input').value.trim();\r\n  if (content.length === 0) {\r\n    return alert('아이템 내용을 입력해주세요');\r\n  }\r\n\r\n  (0,_utils_js__WEBPACK_IMPORTED_MODULE_1__.pushItem)(state, e);\r\n\r\n  render();\r\n};\r\n\r\nconst editItem = (e) => {\r\n  state.selectedItem = Number(e.target.dataset.key);\r\n  render();\r\n};\r\n\r\nconst CancelItem = () => {\r\n  state.selectedItem = -1;\r\n  render();\r\n};\r\n\r\nconst deleteItem = (e) => {\r\n  const key = Number(e.target.dataset.key);\r\n  state.todoItems.splice(key, 1);\r\n  render();\r\n};\r\n\r\nconst updateItem = (e) => {\r\n  e.preventDefault();\r\n  const content = e.target.querySelector('input').value.trim();\r\n  if (content.length === 0) {\r\n    return alert('아이템 내용을 입력해주세요');\r\n  }\r\n  state.todoItems[state.selectedItem].content = content;\r\n  state.selectedItem = -1;\r\n  render();\r\n};\r\n\r\n// esc\r\n(() => {\r\n  document.addEventListener('keydown', (e) => {\r\n    const keyCode = e.keyCode;\r\n    if (keyCode == 27 && state.selectedItem != -1) {\r\n      CancelItem();\r\n    }\r\n  });\r\n})();\r\n\r\nconst toggleItem = (e) => {\r\n  const key = Number(e.target.dataset.key);\r\n  const item = state.todoItems[key];\r\n  item.isComplete = !item.isComplete;\r\n  render();\r\n};\r\n\r\nconst render = () => {\r\n  const $app = document.querySelector('#app');\r\n  $app.innerHTML = (0,_template_js__WEBPACK_IMPORTED_MODULE_0__.template)();\r\n\r\n  // 태그 등록\r\n  const $appenderForm = $app.querySelector('.appender');\r\n  const $modifiers = $app.querySelectorAll('.modifier');\r\n  const $cancelers = $app.querySelectorAll('.canceler');\r\n  const $deleter = $app.querySelectorAll('.deleter');\r\n  const $modifierForm = $app.querySelector('form[name=\"modifierForm\"]');\r\n  const $complete = $app.querySelectorAll('.complete');\r\n\r\n  /** 이벤트 등록 */\r\n  // 아이템 추가 관리\r\n  $appenderForm.addEventListener('submit', addItem);\r\n\r\n  // 아이템 수정 버튼 관리\r\n  $modifiers.forEach(($modifier) => {\r\n    $modifier.addEventListener('click', editItem);\r\n  });\r\n\r\n  // 아이템 수정 취소 버튼 관리\r\n  $cancelers.forEach(($canceler) => {\r\n    $canceler.addEventListener('click', CancelItem);\r\n  });\r\n\r\n  // 아이템 수정 관리\r\n  $modifierForm?.addEventListener('submit', updateItem);\r\n\r\n  // 아이템 삭제 관리\r\n  $deleter.forEach(($el) => {\r\n    $el.addEventListener('click', deleteItem);\r\n  });\r\n\r\n  // 토글 관리\r\n  $complete.forEach(($el) => {\r\n    $el.addEventListener('click', toggleItem);\r\n  });\r\n};\r\n\n\n//# sourceURL=webpack://js-study-lv1/./step1/src/service.js?");

/***/ }),

/***/ "./step1/src/template.js":
/*!*******************************!*\
  !*** ./step1/src/template.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"template\": () => (/* binding */ template)\n/* harmony export */ });\n/* harmony import */ var _service_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./service.js */ \"./step1/src/service.js\");\n/* harmony import */ var _components_item_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/item.js */ \"./step1/src/components/item.js\");\n\r\n\r\n\r\nfunction template() {\r\n  return /*html*/ `\r\n    <main id=\"app\">\r\n      <h1>📃 TodoList</h1>\r\n      <form name=\"appenderForm\" class=\"appender\" action=\"\">\r\n        <fieldset>\r\n          <legend hidden>TodoList Form</legend>\r\n          <label>\r\n            <span hidden>아이템 추가</span>\r\n            <input type=\"text\" size=\"40\" placeholder=\"Todo Item 내용을 입력해주세요\">\r\n          </label>\r\n          <button type=\"submit\">전송</button>\r\n        </fieldset>\r\n      </form>\r\n      <ul>\r\n        ${_service_js__WEBPACK_IMPORTED_MODULE_0__.state.todoItems.map(_components_item_js__WEBPACK_IMPORTED_MODULE_1__.item).join('')}\r\n      </ul>\r\n    </main>\r\n    `;\r\n}\r\n\n\n//# sourceURL=webpack://js-study-lv1/./step1/src/template.js?");

/***/ }),

/***/ "./step1/src/utils.js":
/*!****************************!*\
  !*** ./step1/src/utils.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"pushItem\": () => (/* binding */ pushItem)\n/* harmony export */ });\nconst uuid = () => {\r\n  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>\r\n    (c ^ (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))).toString(16)\r\n  );\r\n};\r\n\r\nconst pushItem = (state, e) => {\r\n  state.todoItems.push({\r\n    id: uuid(),\r\n    createAt: Date.now(),\r\n    content: e.target.querySelector('input').value,\r\n    isComplete: false\r\n  });\r\n};\r\n\n\n//# sourceURL=webpack://js-study-lv1/./step1/src/utils.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./step1/src/app.js");
/******/ 	
/******/ })()
;