'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _get2 = require('lodash/get');

var _get3 = _interopRequireDefault(_get2);

exports.default = createWatchCompiler;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var noop = function noop() {
  return void 0;
};
function createWatchCompiler(compiler, watchOptions) {
  // this ugly statement to create a watch compiler is unfortunately necessary,
  // as webpack clears the file timestamps with the official compiler.watch()
  var createWatcher = function createWatcher() {
    return new compiler.constructor.Watching(compiler, watchOptions, noop);
  };
  var watchCompiler = null;

  return {
    watch: function watch() {
      if (watchCompiler === null) {
        watchCompiler = createWatcher();
      } else {
        var times = compiler.watchFileSystem.watcher.getTimes();
        // check if we can store some collected file timestamps
        // the non-empty check is necessary as the times will be reseted after .close()
        // and we don't want to reset already existing timestamps
        if ((0, _keys2.default)(times).length > 0) {
          // set already collected file timestamps to cache compiled files
          // webpack will do this only after a file change, but that will not happen when we add or delete files
          // and this means that we have to test the whole test suite again ...
          compiler.fileTimestamps = times; // eslint-disable-line no-param-reassign
          compiler.contextTimestamps = times; // eslint-disable-line no-param-reassign
        }

        watchCompiler.close(function () {
          watchCompiler = createWatcher();
        });
      }
    },
    pause: function pause() {
      if (watchCompiler !== null && watchCompiler.watcher) {
        watchCompiler.watcher.pause();
      }
    },
    getWatchOptions: function getWatchOptions() {
      // 200 is the default value by webpack
      return (0, _get3.default)(watchCompiler, 'watchOptions', { aggregateTimeout: 200 });
    }
  };
}