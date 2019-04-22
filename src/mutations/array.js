"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.push = function (e, nextValue) { return e.currentState.concat([nextValue]); };
exports.set = function (e, nextValue) { return nextValue.slice(); };
exports.clear = function () { return []; };
exports.filter = function (e, nextValue, predicate) { return e.currentState.filter(function (item, idx) { return predicate(item, nextValue, idx); }); };
exports.sort = function (e, predicate) { return e.currentState.slice().sort(predicate); };
