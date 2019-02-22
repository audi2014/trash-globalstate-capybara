import createStore from "../src/index";

it("logger", done => {
  const store = createStore({
    users: ["a", "z", "u"],
    time: "",
    session: "token"
  });
  const action = store.createAction(
    "users",
    ({ value }, nextValue) => [...value, nextValue],
    "test_info"
  );
  store.applyMiddleware((v, s, n) => {
    console.log("logger", v.info);

    expect(v.info).toEqual();
    done();
    n(v);
  }, "dispatch");

  action("test_v");
});
