import {DispatchEntity, t_dispatch_fn} from "../store/types";
import {Store} from "../store";

export const memo = (e: DispatchEntity, s: Store, next: t_dispatch_fn) => {
    try {
        if (JSON.stringify(e.currentState) === JSON.stringify(s.getState(e.key))) {
            return;
        }
    } catch (e) {
    }
    return next(e, s);
};