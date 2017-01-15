/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _engine = __webpack_require__(1);

	var _engine2 = _interopRequireDefault(_engine);

	var _game = __webpack_require__(8);

	var _game2 = _interopRequireDefault(_game);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function handleError(error) {
	  console.error('Engine exploded');
	  console.error(error.message);
	  console.error(error.stack);
	}

	Promise.resolve().then(_game2.default.start).then(_engine2.default.start).then(function () {
	  return console.log('Engine started');
	}).catch(handleError);

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _bluebird = __webpack_require__(2);

	var _bluebird2 = _interopRequireDefault(_bluebird);

	var _ramda = __webpack_require__(3);

	var _providers = __webpack_require__(4);

	var _providers2 = _interopRequireDefault(_providers);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function startAdapter(name, adapter) {
	  var provider = (0, _ramda.prop)(name, _providers2.default);

	  if (provider) {
	    return adapter(provider);
	  }

	  return _bluebird2.default.reject(new Error('No provider named ' + adapter));
	}

	function start(app) {
	  return _bluebird2.default.props((0, _ramda.map)(startAdapter, app.adapters));
	}

	exports.default = {
	  start: start
	};

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = require("bluebird");

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = require("ramda");

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _telegram = __webpack_require__(5);

	var _telegram2 = _interopRequireDefault(_telegram);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	  telegram: _telegram2.default
	};

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _nodeTelegramBotApi = __webpack_require__(6);

	var _nodeTelegramBotApi2 = _interopRequireDefault(_nodeTelegramBotApi);

	var _rx = __webpack_require__(7);

	var _ramda = __webpack_require__(3);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function buildMessageStream(bot, regex) {
	  var match = new RegExp(regex);

	  return _rx.Observable.fromEvent(bot, 'message').filter(function (msg) {
	    return match.test(msg.text);
	  });
	}

	function sendMessage(bot, message, options) {
	  bot.sendMessage(message, options);
	  return _rx.Observable.of(false);
	}

	function start() {
	  var token = process.env.BOT_KEY;
	  var bot = new _nodeTelegramBotApi2.default(token);

	  return bot.startPolling().then((0, _ramda.always)({
	    stop: (0, _ramda.bind)(bot.stopPolling, bot), // => Promise
	    send: (0, _ramda.partial)(sendMessage, [bot]), // => Stream
	    subscribe: (0, _ramda.partial)(buildMessageStream, [bot]) }));
	}

	exports.default = {
	  start: start
	};

/***/ },
/* 6 */
/***/ function(module, exports) {

	module.exports = require("node-telegram-bot-api");

/***/ },
/* 7 */
/***/ function(module, exports) {

	module.exports = require("rx");

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _ramda = __webpack_require__(3);

	var _adapters = __webpack_require__(9);

	var _adapters2 = _interopRequireDefault(_adapters);

	var _database = __webpack_require__(14);

	var _database2 = _interopRequireDefault(_database);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function build(dao) {
	  return {
	    adapters: (0, _ramda.mapObjIndexed)(function (v, k) {
	      console.log(k, v);

	      var ret = {
	        match: v.match,
	        handler: (0, _ramda.partial)(v.handler, [dao])
	      };

	      console.log(ret);

	      return ret;
	    }, _adapters2.default)
	  };
	}

	function start() {
	  return _database2.default.connect().then(build);
	}

	exports.default = {
	  start: start
	};

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _telegram = __webpack_require__(10);

	var _telegram2 = _interopRequireDefault(_telegram);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	  telegram: _telegram2.default
	};

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = start;

	var _ramda = __webpack_require__(3);

	var _routes = __webpack_require__(11);

	var _routes2 = _interopRequireDefault(_routes);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function start(dao, provider) {
	  return Promise.resolve(_routes2.default.map(function (route) {
	    return provider.subscribe(route.match).subscribe((0, _ramda.partial)(route.handler, [dao, provider]));
	  }));
	}

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _handlers = __webpack_require__(12);

	var _handlers2 = _interopRequireDefault(_handlers);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = [{
	  match: /\/start/,
	  handler: _handlers2.default.start
	}];

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _start = __webpack_require__(13);

	var _start2 = _interopRequireDefault(_start);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	  start: _start2.default
	};

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = start;

	var _rx = __webpack_require__(7);

	function start(dao, provider, msg) {
	  return provider.send(msg.from.id, msg.text);
	}

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _mongodb = __webpack_require__(15);

	var _player = __webpack_require__(16);

	var _player2 = _interopRequireDefault(_player);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function build(client) {
	  return {
	    player: _player2.default.build(client)
	  };
	}

	function connect() {
	  return _mongodb.MongoClient.connect(process.env.MONGO_URL).then(build);
	}

	exports.default = {
	  connect: connect
	};

/***/ },
/* 15 */
/***/ function(module, exports) {

	module.exports = require("mongodb");

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _ramda = __webpack_require__(3);

	function find(client, query) {
	  return Promise.resolve(query);
	}

	function update(client, query) {
	  return Promise.resolve(query);
	}

	function create(client, query) {
	  return Promise.resolve(query);
	}

	function destroy(client, query) {
	  return Promise.resolve(query);
	}

	function build(client) {
	  return {
	    find: (0, _ramda.partial)(find, [client]),
	    update: (0, _ramda.partial)(update, [client]),
	    create: (0, _ramda.partial)(create, [client]),
	    destroy: (0, _ramda.partial)(destroy, [client])
	  };
	}

	exports.default = {
	  build: build
	};

/***/ }
/******/ ]);