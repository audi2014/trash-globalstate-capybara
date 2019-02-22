import createStore from "../src/index";

let store = null;
const push = ({ value }, nextValue) => [...value, nextValue];
const errorMutation = ({ value }, nextValue) => null;

beforeEach(() => {
  store = createStore({
    users: ["a", "z", "u"],
    time: "",
    session: "token"
  });
});

it("createAction", () => {
  const _a1 = store.createAction("users", errorMutation);
  const _t = store.createAction("users", push);
  const _a2 = store.createAction("users", errorMutation);
  _t("test");
  expect(store.getState("users")).toEqual(["a", "z", "u", "test"]);
});

it("createAction array", () => {
  const [_a1, _t, _a2] = store.createAction("users", [
    errorMutation,
    push,
    errorMutation
  ]);
  _t("test");
  expect(store.getState("users")).toEqual(["a", "z", "u", "test"]);
});

it("createAction obj", () => {
  const obj = store.createAction("users", {
    errorMutation,
    push,
    errorMutation
  });
  obj.push("test");
  expect(store.getState("users")).toEqual(["a", "z", "u", "test"]);
});
