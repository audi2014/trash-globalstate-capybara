
import {dispatch as _dispatch_fn} from "./dispatch";
import {createAction as _createAction_fn} from "./createAction";
import {subscribe as _subscribe_fn} from "./subscribe";
import {unsubscribe as _unsubscribe_fn} from "./unsubscribe";
import {
    DispatchEntity, SubscriptionCallbackEntity,
    SubscriptionEntity,
    t_dispatch_fn,
    t_dispatch_middleware,
    t_fn_void,
    t_mutation_fn, t_subscribe_fn, t_subscribe_middleware, t_unsubscribe_fn, t_unsubscribe_middleware
} from "./types";


export class Store {
    private subscriptions: SubscriptionEntity[] = [];
    private state: object;
    private methods: {
        dispatch: t_dispatch_fn,
        subscribe: t_subscribe_fn,
        unsubscribe: t_unsubscribe_fn,
    } = {
        dispatch: _dispatch_fn,
        subscribe: _subscribe_fn,
        unsubscribe: _unsubscribe_fn,
    };

    constructor(initialState: object = {}) {
        this.state = {...initialState};
    }

    dispatch(e: DispatchEntity) {
        return this.methods.dispatch(e, this);
    }



    createAction(
        key: string,
        mutation: t_mutation_fn,
        info: string = '',
    ): t_fn_void {
        return _createAction_fn({key, mutation, info}, this);
    }

    createActionArray(
        key: string,
        mutation: t_mutation_fn[],
        info: string = '',
    ): t_fn_void[] {
        return mutation.map((mutation, idx) =>
            this.createAction(
                key,
                mutation,
                `${info}[${idx}]`
            )
        );
    }

    createActionDictionary(
        key: string,
        mutation: { [id: string]: t_mutation_fn; },
        info: string = '',
    ): { [id: string]: t_fn_void } {
        return Object.keys(mutation).reduce((result, k) => {
            result[k] = this.createAction(
                key,
                mutation[k],
                `${info}.${k}`
            );
            return result;
        }, {});
    }

    subscribe(
        cb: (e: SubscriptionCallbackEntity) => void,
        keys: string[],
        info: string = '',
    ) {
        this.subscriptions = this.methods.subscribe({clallbackfn: cb, keys, info}, this);
        return cb; // return subscr id
    }

    unsubscribe(cb: t_fn_void):void {
        this.subscriptions = this.methods.unsubscribe(cb,this);
    }

    setState(nextState: object): object {
        this.state = {...this.state, ...nextState};
        return this.state;
    }

    getState(key: string): object {
        return key ? this.state[key] : [...this.state[key]];
    }

    getSubscriptions(): SubscriptionEntity[] {
        return [...this.subscriptions];
    };

    applyDispatchMiddleware(fn: t_dispatch_middleware) {
        const prevFn = this.methods.dispatch;
        this.methods.dispatch = function (e: DispatchEntity, s: Store) {
            return fn(e, s, prevFn);
        }
    }
    applySubscribeMiddleware(fn: t_subscribe_middleware) {
        const prevFn = this.methods.subscribe;
        this.methods.subscribe = function (e: SubscriptionEntity, s: Store) {
            return fn(e, s, prevFn);
        }
    }
    applyUnsubscribeMiddleware(fn: t_unsubscribe_middleware) {
        const prevFn = this.methods.unsubscribe;
        this.methods.unsubscribe = function (cb:t_fn_void, s: Store) {
            return fn(cb, s, prevFn);
        }
    }
}

export const createStore = (initialState: object = {}): Store => {
    return new Store(initialState);
};