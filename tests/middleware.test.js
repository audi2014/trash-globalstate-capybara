import createStore from "../src/index";
let store = null;
let action = null;
//"dispatch", "unsubscribe", "subscribe", "createAction", "setState"

beforeEach(() => {
  store = createStore({
    users: ["a", "z", "u"],
    time: "",
    session: "token"
  });
  action = store.createAction(
    "users",
    ({ value }, nextValue) => [...value, nextValue],
    "test_info"
  );
});
it("dispatch-logger", done => {
  store.applyMiddleware((v, s, n) => {
    expect(v.info).toEqual("test_info");
    done();
    n(v);
  }, "dispatch");

  action("test_v");
});

it("subscribe-logger", done => {
  store.applyMiddleware((cb, keys, info, store, next) => {
    expect(keys).toEqual(["users", "???"]);
    expect(info).toEqual("test_info");
    next(cb, keys, info);
  }, "subscribe");

  store.subscribe(
    e => {
      expect(e.value).toEqual(["a", "z", "u"]);
      expect(e.info).toEqual("__init__");
      done();
    },
    ["users", "???"],
    "test_info"
  );
});

it("unsubscribe-logger", done => {
  const id = store.subscribe(e => {}, ["users", "???"], "test_info");
  store.applyMiddleware((cb, info, store, next) => {
    expect(cb).toBe(id);
    expect(info).toEqual("info-of-unsub");
    next(cb);
    done();
  }, "unsubscribe");

  store.unsubscribe(id, "info-of-unsub");
});

it("no-unsubscribe-logger", () => {
  store.applyMiddleware((cb, info, store, next) => {
    throw new Error("unsubscribe does not called");
    next(cb);
  }, "unsubscribe");
  const id = store.subscribe(e => {}, ["users", "???"], "test_info");
  action("test");
});
