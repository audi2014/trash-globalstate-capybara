
import {Store} from "./index";
import {DispatchEntity, SubscriptionEntity} from "./types";

export const dispatch = (e: DispatchEntity, s: Store): void => {

    const prev = s.getState(e.key);
    if (prev !== e.currentState) {
        s.getSubscriptions().forEach((s: SubscriptionEntity) => {
            if (s.keys.indexOf(e.key) !== -1) {
                s.clallbackfn({key: e.key, value: e.currentState, prev, info: e.info});
            }
        });
        s.setState({[e.key]: e.currentState});
    }

};