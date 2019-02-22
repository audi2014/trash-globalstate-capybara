import createStore from "../src/index";
const push = ({ value }, nextValue) => [...value, nextValue];

let store = null;

beforeEach(() => {
  store = createStore({
    users: ["a", "z", "u"],
    time: "",
    session: "token"
  });
});

it("store created", () => {
  expect(store.getState("users")).toEqual(["a", "z", "u"]);
});
