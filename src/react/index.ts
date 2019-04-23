import {Store} from "../store";
import {SubscriptionCallbackEntity, SubscriptionEntity} from "../store/types";
import * as React from "react";


export const mapValue = function (key, nextValue, prevValue) {
    return nextValue;
};
export const mapStateToProps = function (state) {
    return state;
};
type t_builder = {
    mapValue: (key: string, nextValue: any, prevValue: any) => any,
    mapStateToProps: (object) => object,
}


export const index = <P extends object>(
    wrappedComponent: React.ComponentType<P>,
    store: Store,
    storeProps: string[] = [],
    builder: t_builder = {
        mapValue: null,
        mapStateToProps: null,
    }
) => {
    const _mapValue = builder.mapValue || mapValue;
    const _mapStateToProps = builder.mapStateToProps || mapStateToProps;

    return class WithStoreSubscription extends React.Component {
        subsHandle: (e: SubscriptionCallbackEntity) => void;
        state = {};
        componentDidMount() {
            this.subsHandle = store.subscribe(this.handleChange, storeProps);
        }
        componentWillUnmount() {
            store.unsubscribe(this.subsHandle);
        }
        handleChange(e: SubscriptionCallbackEntity): void {
            this.setState({
                [e.key]: _mapValue(e.key, e.value, e.prev)
            });
        }
        render() {
            return React.createElement(wrappedComponent, {
                ...this.props,
                ..._mapStateToProps(this.state)
            });
        }
    };
};
