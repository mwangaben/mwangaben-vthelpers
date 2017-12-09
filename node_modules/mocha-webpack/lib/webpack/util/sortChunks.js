'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = sortChunks;

var _toposort = require('toposort');

var _toposort2 = _interopRequireDefault(_toposort);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function sortChunks(chunks) {
  // build a map (chunk-id -> chunk) as look table.
  var nodeMap = chunks.reduce(function (map, chunk) {
    map[chunk.id] = chunk; // eslint-disable-line no-param-reassign
    return map;
  }, {});

  // add edges for each parent relationship into the graph
  var edges = [];
  chunks.forEach(function (chunk) {
    if (chunk.parents) {
      // Add an edge for each parent (parent -> child)
      chunk.parents.forEach(function (parentId) {
        var parentChunk = nodeMap[parentId];
        // If the parent chunk does not exist (e.g. because of an excluded chunk) we ignore that parent
        if (parentChunk) {
          edges.push([parentChunk, chunk]);
        }
      });
    }
  });

  return _toposort2.default.array(chunks, edges);
}