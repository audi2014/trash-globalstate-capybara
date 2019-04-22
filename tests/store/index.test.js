"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var store_1 = require("../../src/store");
test("store created", function () {
    var store = store_1.createStore({
        users: ["a", "z", "u"],
        time: "",
        session: "token"
    });
    expect(store.getState("users")).toEqual(["a", "z", "u"]);
});
