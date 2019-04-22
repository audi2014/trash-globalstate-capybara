import {createStore, Store} from "../../src/store";


let store:Store = null;
const push = ({ currentState }, nextValue) => [...currentState, nextValue];
const errorMutation = ({ currentState }, nextValue) => null;

beforeEach(() => {
    store = createStore({
        users: ["a", "z", "u"],
        time: "",
        session: "token"
    });
});

test("createAction", () => {
    const _a1 = store.createAction("users", errorMutation);
    const _t = store.createAction("users", push);
    const _a2 = store.createAction("users", errorMutation);
    _t("test");
    expect(store.getState("users")).toEqual(["a", "z", "u", "test"]);
});

test("createAction array", () => {
    const [_a1, _t, _a2] = store.createActionArray("users", [
        errorMutation,
        push,
        errorMutation
    ]);
    _t("test");
    expect(store.getState("users")).toEqual(["a", "z", "u", "test"]);
});

test("createAction obj", () => {
    const obj = store.createActionDictionary("users", {
        errorMutation:errorMutation,
        push,
    });
    obj.push("test");
    expect(store.getState("users")).toEqual(["a", "z", "u", "test"]);
});
