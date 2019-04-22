import {Store} from "./index";
import {ActionCreationEntity} from "./types";

export function createAction(
    e: ActionCreationEntity,
    s: Store) {
    return function (...actionArguments: any[]): void {
        const curr = s.getState(e.key);
        const next = e.mutation({key: e.key, currentState: curr, info: e.info}, ...actionArguments);
        return s.dispatch({
            key: e.key,
            currentState: next,
            info: e.info
        });
    }
}
