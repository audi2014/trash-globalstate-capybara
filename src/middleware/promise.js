"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (function (e, s, next) {
    if (typeof e.currentState === "object" && typeof e.currentState.then === "function") {
        return e.currentState.then(function (r) { return next(__assign({}, e, { currentState: r }), s); });
    }
    else {
        return next(e, s);
    }
});
