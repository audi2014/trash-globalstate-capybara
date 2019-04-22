"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.INFO_INIT = "__init__";
exports.subscribe = function (e, s) {
    var subscriptions = s.getSubscriptions();
    var existSubscriptions = subscriptions.filter(function (sub) {
        return sub.clallbackfn === e.clallbackfn;
    });
    if (existSubscriptions.length > 0) {
        console.error("handler can't subscribe twice", e);
    }
    else {
        subscriptions.push(e);
        e.keys.forEach(function (key) {
            var prev = s.getState(key);
            e.clallbackfn({ key: key, value: prev, prev: prev, info: exports.INFO_INIT });
        });
    }
    return subscriptions;
};
