"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.unsubscribe = function (cb, s) {
    return s.getSubscriptions()
        .filter(function (sub) { return sub.clallbackfn !== cb; });
};
