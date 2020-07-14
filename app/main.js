/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/app/app.js":
/*!************************!*\
  !*** ./src/app/app.js ***!
  \************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants */ \"./src/app/constants.js\");\n/* harmony import */ var _entity__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./entity */ \"./src/app/entity.js\");\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\n\n\n\nvar App = /*#__PURE__*/function () {\n  function App() {\n    _classCallCheck(this, App);\n\n    this.html = {\n      console: document.getElementById(\"console\"),\n      canvas: document.getElementById(\"canvas\")\n    };\n    this.canvas2d = this.html.canvas.getContext('2d');\n    this.canvasWidth = _constants__WEBPACK_IMPORTED_MODULE_0__[\"TILE_SIZE\"] * _constants__WEBPACK_IMPORTED_MODULE_0__[\"GRID_WIDTH\"];\n    this.canvasHeight = _constants__WEBPACK_IMPORTED_MODULE_0__[\"TILE_SIZE\"] * _constants__WEBPACK_IMPORTED_MODULE_0__[\"GRID_HEIGHT\"];\n    this.html.canvas.width = this.canvasWidth;\n    this.html.canvas.height = this.canvasHeight;\n    this.html.canvas.addEventListener('pointerdown', this.onPointerDown.bind(this));\n    this.ready = false;\n    this.assets = {// ...\n    };\n    this.player = null;\n    this.entities = [];\n    this.prevTime = null;\n    this.nextFrame = window.requestAnimationFrame(this.main.bind(this));\n  }\n\n  _createClass(App, [{\n    key: \"initialisationCheck\",\n    value: function initialisationCheck() {\n      var _this = this;\n\n      // Assets check\n      var allAssetsLoaded = true;\n      var numLoadedAssets = 0;\n      var numTotalAssets = 0;\n      Object.keys(this.assets).forEach(function (id) {\n        var asset = _this.assets[id];\n        allAssetsLoaded = allAssetsLoaded && asset.loaded;\n        if (asset.loaded) numLoadedAssets++;\n        numTotalAssets++;\n      }); // Paint status\n\n      this.canvas2d.clearRect(0, 0, this.canvasWidth, this.canvasHeight);\n      this.canvas2d.textAlign = 'start';\n      this.canvas2d.textBaseline = 'top';\n      this.canvas2d.fillStyle = '#ccc';\n      this.canvas2d.font = \"1em monospace\";\n      this.canvas2d.fillText(\"Loading \".concat(numLoadedAssets, \" / \").concat(numTotalAssets, \" \"), _constants__WEBPACK_IMPORTED_MODULE_0__[\"TILE_SIZE\"], _constants__WEBPACK_IMPORTED_MODULE_0__[\"TILE_SIZE\"]);\n\n      if (allAssetsLoaded) {\n        this.ready = true;\n        this.loadLevel(0);\n      }\n    }\n  }, {\n    key: \"resetLevel\",\n    value: function resetLevel() {\n      this.player = undefined;\n      this.entities = [];\n    }\n  }, {\n    key: \"loadLevel\",\n    value: function loadLevel() {\n      var level = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;\n      this.resetLevel();\n      this.player = new _entity__WEBPACK_IMPORTED_MODULE_1__[\"default\"](this);\n      this.player.x = _constants__WEBPACK_IMPORTED_MODULE_0__[\"TILE_SIZE\"] * _constants__WEBPACK_IMPORTED_MODULE_0__[\"GRID_WIDTH\"] / 2;\n      this.player.y = _constants__WEBPACK_IMPORTED_MODULE_0__[\"TILE_SIZE\"] * _constants__WEBPACK_IMPORTED_MODULE_0__[\"GRID_HEIGHT\"] / 2;\n      this.entities.push(this.player);\n    }\n  }, {\n    key: \"main\",\n    value: function main(time) {\n      var timeStep = this.prevTime ? time - this.prevTime : time;\n      this.prevTime = time;\n\n      if (this.ready) {\n        this.play(timeStep);\n        this.paint();\n      } else {\n        this.initialisationCheck();\n      }\n\n      this.nextFrame = window.requestAnimationFrame(this.main.bind(this));\n    }\n  }, {\n    key: \"play\",\n    value: function play(timeStep) {\n      this.entities.forEach(function (entity) {\n        return entity.play();\n      });\n      this.processPhysics(timeStep);\n    }\n  }, {\n    key: \"paint\",\n    value: function paint() {\n      var c2d = this.canvas2d;\n      c2d.clearRect(0, 0, this.canvasWidth, this.canvasHeight);\n      c2d.strokeStyle = 'rgba(128, 128, 128, 0.5)';\n\n      for (var row = 0; row < _constants__WEBPACK_IMPORTED_MODULE_0__[\"GRID_HEIGHT\"]; row++) {\n        for (var col = 0; col < _constants__WEBPACK_IMPORTED_MODULE_0__[\"GRID_WIDTH\"]; col++) {\n          c2d.beginPath();\n          c2d.rect(col * _constants__WEBPACK_IMPORTED_MODULE_0__[\"TILE_SIZE\"], row * _constants__WEBPACK_IMPORTED_MODULE_0__[\"TILE_SIZE\"], _constants__WEBPACK_IMPORTED_MODULE_0__[\"TILE_SIZE\"], _constants__WEBPACK_IMPORTED_MODULE_0__[\"TILE_SIZE\"]);\n          c2d.stroke();\n        }\n      }\n\n      this.entities.forEach(function (entity) {\n        return entity.paint();\n      });\n    }\n  }, {\n    key: \"onPointerDown\",\n    value: function onPointerDown(e) {\n      var coords = getEventCoords(e, this.html.canvas);\n      console.log(coords);\n      stopEvent(e);\n    }\n  }, {\n    key: \"processPhysics\",\n    value: function processPhysics(timeStep) {\n      var timeCorrection = timeStep / _constants__WEBPACK_IMPORTED_MODULE_0__[\"EXPECTED_TIMESTEP\"]; // Move Actors and Particles\n\n      this.entities.forEach(function (entity) {\n        entity.x += entity.moveX * timeCorrection;\n        entity.y += entity.moveY * timeCorrection;\n      });\n\n      for (var a = 0; a < this.entities.length; a++) {\n        var entityA = this.entities[a];\n\n        for (var b = a + 1; b < this.entities.length; b++) {\n          var entityB = this.entities[b];\n          var collisionCorrection = Physics.checkCollision(entityA, entityB);\n\n          if (collisionCorrection) {\n            entityA.x = collisionCorrection.ax;\n            entityA.y = collisionCorrection.ay;\n            entityB.x = collisionCorrection.bx;\n            entityB.y = collisionCorrection.by;\n            entityA.onCollision(entityB, collisionCorrection);\n            entityB.onCollision(entityA, collisionCorrection);\n          }\n        }\n      }\n    }\n  }]);\n\n  return App;\n}();\n\nfunction getEventCoords(event, element) {\n  var xRatio = element.width && element.offsetWidth ? element.width / element.offsetWidth : 1;\n  var yRatio = element.height && element.offsetHeight ? element.height / element.offsetHeight : 1;\n  var x = event.offsetX * xRatio;\n  var y = event.offsetY * yRatio;\n  return {\n    x: x,\n    y: y\n  };\n}\n\nfunction stopEvent(e) {\n  if (!e) return false;\n  e.preventDefault && e.preventDefault();\n  e.stopPropagation && e.stopPropagation();\n  e.returnValue = false;\n  e.cancelBubble = true;\n  return false;\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (App);\n\n//# sourceURL=webpack:///./src/app/app.js?");

/***/ }),

/***/ "./src/app/constants.js":
/*!******************************!*\
  !*** ./src/app/constants.js ***!
  \******************************/
/*! exports provided: TILE_SIZE, GRID_WIDTH, GRID_HEIGHT, SHAPES, ROTATIONS, DIRECTIONS, EXPECTED_FRAMES_PER_SECOND, EXPECTED_TIMESTEP */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"TILE_SIZE\", function() { return TILE_SIZE; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"GRID_WIDTH\", function() { return GRID_WIDTH; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"GRID_HEIGHT\", function() { return GRID_HEIGHT; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"SHAPES\", function() { return SHAPES; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"ROTATIONS\", function() { return ROTATIONS; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"DIRECTIONS\", function() { return DIRECTIONS; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"EXPECTED_FRAMES_PER_SECOND\", function() { return EXPECTED_FRAMES_PER_SECOND; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"EXPECTED_TIMESTEP\", function() { return EXPECTED_TIMESTEP; });\nvar TILE_SIZE = 64;\nvar GRID_WIDTH = 24;\nvar GRID_HEIGHT = 16;\nvar SHAPES = {\n  NONE: 'none',\n  CIRCLE: 'circle',\n  SQUARE: 'square',\n  POLYGON: 'polygon'\n};\nvar ROTATIONS = {\n  EAST: 0,\n  SOUTHEAST: Math.PI * 0.25,\n  SOUTH: Math.PI * 0.5,\n  SOUTHWEST: Math.PI * 0.75,\n  WEST: Math.PI,\n  NORTHWEST: Math.PI * -0.75,\n  NORTH: Math.PI * -0.5,\n  NORTHEAST: Math.PI * -0.25\n};\nvar DIRECTIONS = {\n  EAST: 0,\n  SOUTH: 1,\n  WEST: 2,\n  NORTH: 3\n};\n/*\r\nWhile the engine is technically able to support any given framerate (determined\r\nby the hardware), a baseline is required to ground our video game logic to.\r\ne.g. we can say that we expect an object with \"movement speed\" of \"2\" to travel\r\n120 pixels in 1 second. (2 pixels per frame * 60 frames per second)\r\n */\n\nvar EXPECTED_FRAMES_PER_SECOND = 60;\nvar EXPECTED_TIMESTEP = 1000 / EXPECTED_FRAMES_PER_SECOND;\n\n//# sourceURL=webpack:///./src/app/constants.js?");

/***/ }),

/***/ "./src/app/entity.js":
/*!***************************!*\
  !*** ./src/app/entity.js ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants */ \"./src/app/constants.js\");\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\n\n\nvar Entity = /*#__PURE__*/function () {\n  function Entity(app) {\n    _classCallCheck(this, Entity);\n\n    this._app = app;\n    this.x = 0;\n    this.y = 0;\n    this._rotation = _constants__WEBPACK_IMPORTED_MODULE_0__[\"ROTATIONS\"].SOUTH; // Rotation in radians\n\n    this.size = _constants__WEBPACK_IMPORTED_MODULE_0__[\"TILE_SIZE\"]; // Movement: self locomotion and external (pushed) movement.\n\n    this.moveX = 0;\n    this.moveY = 0;\n    this.pushX = 0;\n    this.pushY = 0;\n    this.shape = _constants__WEBPACK_IMPORTED_MODULE_0__[\"SHAPES\"].NONE;\n    this.shapePolygonPath = null; // Only applicable if shape === SHAPES.POLYGON\n\n    this.solid = false;\n    this.movable = false;\n  }\n\n  _createClass(Entity, [{\n    key: \"play\",\n    value: function play() {}\n  }, {\n    key: \"paint\",\n    value: function paint() {\n      var c2d = this._app.canvas2d;\n      c2d.beginPath();\n      c2d.fillStyle = '#c44';\n      c2d.arc(this.x, this.y, this.size / 2, 0, 2 * Math.PI);\n      c2d.fill();\n    }\n  }, {\n    key: \"onCollision\",\n    value: function onCollision(target, collisionCorrection) {\n      console.log('BONK');\n    }\n  }]);\n\n  return Entity;\n}();\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Entity);\n\n//# sourceURL=webpack:///./src/app/entity.js?");

/***/ }),

/***/ "./src/app/index.js":
/*!**************************!*\
  !*** ./src/app/index.js ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./app */ \"./src/app/app.js\");\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (_app__WEBPACK_IMPORTED_MODULE_0__[\"default\"]);\n\n//# sourceURL=webpack:///./src/app/index.js?");

/***/ }),

/***/ "./src/main.js":
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./app */ \"./src/app/index.js\");\n/*  \nBull, China Shop\n----------------\n\nA game about smashing things.\n\n(Shaun A. Noordin | shaunanoordin.com | 20200711)\n */\n\nvar app;\n\nwindow.onload = function () {\n  window.app = new _app__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\n};\n\n//# sourceURL=webpack:///./src/main.js?");

/***/ })

/******/ });