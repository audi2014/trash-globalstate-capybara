import {createStore, Store} from "../../src/store";

let store:Store = null;
let action = null;

beforeEach(() => {
    store = createStore({
        users: ["a", "z", "u"],
        time: "",
        session: "token"
    });
    action = store.createAction(
        "users",
        ({ currentState }, nextValue) => [...currentState, nextValue],
        "test_info"
    );
});
test("dispatch-logger", () => {
    let m_info = "";
    store.applyDispatchMiddleware(
        (v, store, next) => {
            m_info = v.info;
            next(v,store);
        }
    );
    action("test_v");
    expect(m_info).toEqual("test_info");
    expect(store.getState("users")).toEqual(["a", "z", "u", "test_v"]);
});

test("subscribe-logger", () => {
    store.applySubscribeMiddleware(
        (e, store, next) => {
            expect(e.keys).toEqual(["users", "???"]);
            expect(e.info).toEqual("test_info");
            return next(e,store);
        }
    );

    let idx = 0;

    store.subscribe(
        e => {
            if(idx === 0) {
                expect(e.value).toEqual(["a", "z", "u"]);
                expect(e.info).toEqual("__init__");

            } else {
                expect(e.value).toEqual(undefined);
                expect(e.info).toEqual("__init__");
            }

            idx++;
        },
        ["users", "???"],
        "test_info"
    );
});

test("unsubscribe-logger", () => {
    const id = store.subscribe(e => {}, ["users", "???"], "test_info");
    store.applyUnsubscribeMiddleware(
        (cb, store, next) => {
            expect(cb).toBe(id);
            return next(cb,store);
        }
    );
    store.unsubscribe(id);
});

it("no-unsubscribe-logger", () => {
    store.applyUnsubscribeMiddleware((cb, store, next) => {
        throw new Error("unsubscribe does not called");
        return next(cb,store);
    });
    const id = store.subscribe(e => {}, ["users", "???"], "test_info");
    action("test");
});
