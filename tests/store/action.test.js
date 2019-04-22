"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var store_1 = require("../../src/store");
var store = null;
var push = function (_a, nextValue) {
    var currentState = _a.currentState;
    return currentState.concat([nextValue]);
};
var errorMutation = function (_a, nextValue) {
    var currentState = _a.currentState;
    return null;
};
beforeEach(function () {
    store = store_1.createStore({
        users: ["a", "z", "u"],
        time: "",
        session: "token"
    });
});
test("createAction", function () {
    var _a1 = store.createAction("users", errorMutation);
    var _t = store.createAction("users", push);
    var _a2 = store.createAction("users", errorMutation);
    _t("test");
    expect(store.getState("users")).toEqual(["a", "z", "u", "test"]);
});
test("createAction array", function () {
    var _a = store.createActionArray("users", [
        errorMutation,
        push,
        errorMutation
    ]), _a1 = _a[0], _t = _a[1], _a2 = _a[2];
    _t("test");
    expect(store.getState("users")).toEqual(["a", "z", "u", "test"]);
});
test("createAction obj", function () {
    var obj = store.createActionDictionary("users", {
        errorMutation: errorMutation,
        push: push,
    });
    obj.push("test");
    expect(store.getState("users")).toEqual(["a", "z", "u", "test"]);
});
