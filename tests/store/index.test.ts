import {createStore} from "../../src/store";


test("store created", () => {
    const store = createStore({
        users: ["a", "z", "u"],
        time: "",
        session: "token"
    });
    expect(store.getState("users")).toEqual(["a", "z", "u"]);
});