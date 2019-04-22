import {Store} from "./index";

export type ActionCreationEntity = {
    key: string;
    mutation: t_mutation_fn;
    info: string;
}
export type SubscriptionCallbackEntity = {
    key: string;
    value: any;
    prev: any;
    info: string;
}
export type DispatchEntity = {
    key: string;
    currentState: any;
    info: string;
}
export type SubscriptionEntity = {
    clallbackfn: (e: SubscriptionCallbackEntity) => void;
    keys: string[];
    info: string;
}

export type t_fn_void = (...actionArguments: any[]) => void;
export type t_dispatch_fn = (e: DispatchEntity, s: Store) => void;
export type t_subscribe_fn = (e: SubscriptionEntity, s: Store) => SubscriptionEntity[];
export type t_unsubscribe_fn = (cb: t_fn_void, s: Store) => SubscriptionEntity[];
export type t_mutation_fn = (de: DispatchEntity, ...args: any[]) => any;


export type t_dispatch_middleware = (e: DispatchEntity, s: Store, next: t_dispatch_fn) => void;
export type t_subscribe_middleware = (e: SubscriptionEntity, s: Store, next: t_subscribe_fn) => SubscriptionEntity[];
export type t_unsubscribe_middleware = (e: t_fn_void, s: Store, next: t_unsubscribe_fn) => SubscriptionEntity[];
