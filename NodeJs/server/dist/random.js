"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.random = void 0;
var _uuid = require("uuid");
var random = () => {
  return (0, _uuid.v4)();
};
exports.random = random;