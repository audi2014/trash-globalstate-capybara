import {createStore, Store} from "../../src/store";

const push = ({ currentState }, nextValue) => [...currentState, nextValue];

let store:Store = null;

beforeEach(() => {
    store = createStore({
        users: ["a", "z", "u"],
        time: "",
        session: "token"
    });
});

test("subscribe", () => {
    const pushUser = store.createAction("users", push);

    const obj = {
        value:null,
        handler: ({ value }) => {
            obj.value = value;
        }
    };
    store.subscribe(obj.handler, ["users"]);

    pushUser("test");
    expect(obj.value).toEqual(["a", "z", "u", "test"]);
});


test("subscribe-twice", () => {

    const pushUser = store.createAction("users", push);
    let count = 0;
    const obj = {
        handler: ({ value }) => {
            count++;
        }
    };
    store.subscribe(obj.handler, ["users"]);
    store.subscribe(obj.handler, ["session"]);
    store.subscribe(obj.handler, ["time"]);

    pushUser("test");
    expect(count).toBe(2);
});

test("unsubscribe", () => {
    const pushUser = store.createAction("users", push);

    const obj = {
        value:null,
        handler: ({ value }) => {
            obj.value = value;
        }
    };
    store.subscribe(obj.handler, ["users"]);
    store.unsubscribe(obj.handler);

    pushUser("test");
    expect(obj.value).toEqual(["a", "z", "u"]);
});