"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var store_1 = require("../../src/store");
var store = null;
var action = null;
beforeEach(function () {
    store = store_1.createStore({
        users: ["a", "z", "u"],
        time: "",
        session: "token"
    });
    action = store.createAction("users", function (_a, nextValue) {
        var currentState = _a.currentState;
        return currentState.concat([nextValue]);
    }, "test_info");
});
test("dispatch-logger", function () {
    var m_info = "";
    store.applyDispatchMiddleware(function (v, store, next) {
        m_info = v.info;
        next(v, store);
    });
    action("test_v");
    expect(m_info).toEqual("test_info");
    expect(store.getState("users")).toEqual(["a", "z", "u", "test_v"]);
});
test("subscribe-logger", function () {
    store.applySubscribeMiddleware(function (e, store, next) {
        expect(e.keys).toEqual(["users", "???"]);
        expect(e.info).toEqual("test_info");
        return next(e, store);
    });
    var idx = 0;
    store.subscribe(function (e) {
        if (idx === 0) {
            expect(e.value).toEqual(["a", "z", "u"]);
            expect(e.info).toEqual("__init__");
        }
        else {
            expect(e.value).toEqual(undefined);
            expect(e.info).toEqual("__init__");
        }
        idx++;
    }, ["users", "???"], "test_info");
});
test("unsubscribe-logger", function () {
    var id = store.subscribe(function (e) { }, ["users", "???"], "test_info");
    store.applyUnsubscribeMiddleware(function (cb, store, next) {
        expect(cb).toBe(id);
        return next(cb, store);
    });
    store.unsubscribe(id);
});
it("no-unsubscribe-logger", function () {
    store.applyUnsubscribeMiddleware(function (cb, store, next) {
        throw new Error("unsubscribe does not called");
        return next(cb, store);
    });
    var id = store.subscribe(function (e) { }, ["users", "???"], "test_info");
    action("test");
});
