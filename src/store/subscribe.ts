import {Store} from "./index";
import {SubscriptionEntity} from "./types";
export const INFO_INIT = "__init__";
export const subscribe = (e:SubscriptionEntity, s:Store) => {
    const subscriptions = s.getSubscriptions();
    const existSubscriptions = subscriptions.filter(sub=>{
        return sub.clallbackfn === e.clallbackfn;
    });
    if(existSubscriptions.length > 0) {
        console.error("handler can't subscribe twice",e);
    } else {
        subscriptions.push(e);
        e.keys.forEach(key => {
            const prev = s.getState(key);
            e.clallbackfn({ key, value:prev, prev:prev, info: INFO_INIT });
        });

    }
    return subscriptions;
};
