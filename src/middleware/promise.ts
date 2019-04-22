import {DispatchEntity, t_dispatch_fn} from "../store/types";
import {Store} from "../store";

export default (e: DispatchEntity, s: Store, next: t_dispatch_fn) => {
    if (typeof e.currentState === "object" && typeof e.currentState.then === "function") {
        return e.currentState.then(r => next({...e, currentState: r}, s));
    } else {
        return next(e, s);
    }
};