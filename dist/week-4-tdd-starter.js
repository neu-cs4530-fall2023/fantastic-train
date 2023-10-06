/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/models/calculator.model.ts":
/*!****************************************!*\
  !*** ./src/models/calculator.model.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CalculatorModel = void 0;
class CalculatorModel {
    pressNumericKey(key) {
        throw new Error('Method not implemented.');
    }
    pressOperatorKey(key) {
        throw new Error('Method not implemented.');
    }
    pressActionKey(key) {
        throw new Error('Method not implemented.');
    }
    display() {
        throw new Error('Method not implemented.');
    }
}
exports.CalculatorModel = CalculatorModel;


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
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CalculatorModel = void 0;
var calculator_model_1 = __webpack_require__(/*! ./models/calculator.model */ "./src/models/calculator.model.ts");
Object.defineProperty(exports, "CalculatorModel", ({ enumerable: true, get: function () { return calculator_model_1.CalculatorModel; } }));

})();

module.exports.myLib = __webpack_exports__;
/******/ })()
;
//# sourceMappingURL=week-4-tdd-starter.js.map