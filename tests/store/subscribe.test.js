"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var store_1 = require("../../src/store");
var push = function (_a, nextValue) {
    var currentState = _a.currentState;
    return currentState.concat([nextValue]);
};
var store = null;
beforeEach(function () {
    store = store_1.createStore({
        users: ["a", "z", "u"],
        time: "",
        session: "token"
    });
});
test("subscribe", function () {
    var pushUser = store.createAction("users", push);
    var obj = {
        value: null,
        handler: function (_a) {
            var value = _a.value;
            obj.value = value;
        }
    };
    store.subscribe(obj.handler, ["users"]);
    pushUser("test");
    expect(obj.value).toEqual(["a", "z", "u", "test"]);
});
test("subscribe-twice", function () {
    var pushUser = store.createAction("users", push);
    var count = 0;
    var obj = {
        handler: function (_a) {
            var value = _a.value;
            count++;
        }
    };
    store.subscribe(obj.handler, ["users"]);
    store.subscribe(obj.handler, ["session"]);
    store.subscribe(obj.handler, ["time"]);
    pushUser("test");
    expect(count).toBe(2);
});
test("unsubscribe", function () {
    var pushUser = store.createAction("users", push);
    var obj = {
        value: null,
        handler: function (_a) {
            var value = _a.value;
            obj.value = value;
        }
    };
    store.subscribe(obj.handler, ["users"]);
    store.unsubscribe(obj.handler);
    pushUser("test");
    expect(obj.value).toEqual(["a", "z", "u"]);
});
