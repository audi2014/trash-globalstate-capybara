
import {Store} from "./index";
import {SubscriptionEntity, t_fn_void} from "./types";

export const unsubscribe = (cb:t_fn_void, s:Store):SubscriptionEntity[] => {
    return s.getSubscriptions()
        .filter(sub => sub.clallbackfn !== cb);
};