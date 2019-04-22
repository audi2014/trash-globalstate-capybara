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
var dispatch_1 = require("./dispatch");
var createAction_1 = require("./createAction");
var subscribe_1 = require("./subscribe");
var unsubscribe_1 = require("./unsubscribe");
var Store = /** @class */ (function () {
    function Store(initialState) {
        if (initialState === void 0) { initialState = {}; }
        this.subscriptions = [];
        this.methods = {
            dispatch: dispatch_1.dispatch,
            subscribe: subscribe_1.subscribe,
            unsubscribe: unsubscribe_1.unsubscribe,
        };
        this.state = __assign({}, initialState);
    }
    Store.prototype.dispatch = function (e) {
        return this.methods.dispatch(e, this);
    };
    Store.prototype.createAction = function (key, mutation, info) {
        if (info === void 0) { info = ''; }
        return createAction_1.createAction({ key: key, mutation: mutation, info: info }, this);
    };
    Store.prototype.createActionArray = function (key, mutation, info) {
        var _this = this;
        if (info === void 0) { info = ''; }
        return mutation.map(function (mutation, idx) {
            return _this.createAction(key, mutation, info + "[" + idx + "]");
        });
    };
    Store.prototype.createActionDictionary = function (key, mutation, info) {
        var _this = this;
        if (info === void 0) { info = ''; }
        return Object.keys(mutation).reduce(function (result, k) {
            result[k] = _this.createAction(key, mutation[k], info + "." + k);
            return result;
        }, {});
    };
    Store.prototype.subscribe = function (cb, keys, info) {
        if (info === void 0) { info = ''; }
        this.subscriptions = this.methods.subscribe({ clallbackfn: cb, keys: keys, info: info }, this);
        return cb; // return subscr id
    };
    Store.prototype.unsubscribe = function (cb) {
        this.subscriptions = this.methods.unsubscribe(cb, this);
    };
    Store.prototype.setState = function (nextState) {
        this.state = __assign({}, this.state, nextState);
        return this.state;
    };
    Store.prototype.getState = function (key) {
        return key ? this.state[key] : this.state[key].slice();
    };
    Store.prototype.getSubscriptions = function () {
        return this.subscriptions.slice();
    };
    ;
    Store.prototype.applyDispatchMiddleware = function (fn) {
        var prevFn = this.methods.dispatch;
        this.methods.dispatch = function (e, s) {
            return fn(e, s, prevFn);
        };
    };
    Store.prototype.applySubscribeMiddleware = function (fn) {
        var prevFn = this.methods.subscribe;
        this.methods.subscribe = function (e, s) {
            return fn(e, s, prevFn);
        };
    };
    Store.prototype.applyUnsubscribeMiddleware = function (fn) {
        var prevFn = this.methods.unsubscribe;
        this.methods.unsubscribe = function (cb, s) {
            return fn(cb, s, prevFn);
        };
    };
    return Store;
}());
exports.Store = Store;
exports.createStore = function (initialState) {
    if (initialState === void 0) { initialState = {}; }
    return new Store(initialState);
};
