"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.memo = function (e, s, next) {
    try {
        if (JSON.stringify(e.currentState) === JSON.stringify(s.getState(e.key))) {
            return;
        }
    }
    catch (e) {
    }
    return next(e, s);
};
