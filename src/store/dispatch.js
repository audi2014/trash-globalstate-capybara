"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dispatch = function (e, s) {
    var _a;
    var prev = s.getState(e.key);
    if (prev !== e.currentState) {
        s.getSubscriptions().forEach(function (s) {
            if (s.keys.indexOf(e.key) !== -1) {
                s.clallbackfn({ key: e.key, value: e.currentState, prev: prev, info: e.info });
            }
        });
        s.setState((_a = {}, _a[e.key] = e.currentState, _a));
    }
};
