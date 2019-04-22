"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
exports.mapValue = function (key, nextValue, prevValue) {
    return nextValue;
};
exports.mapStateToProps = function (state) {
    return state;
};
exports.withGlobalState = function (wrappedComponent, store, storeProps, builder) {
    if (storeProps === void 0) { storeProps = []; }
    if (builder === void 0) { builder = {
        mapValue: null,
        mapStateToProps: null,
    }; }
    var _mapValue = builder.mapValue || exports.mapValue;
    var _mapStateToProps = builder.mapStateToProps || exports.mapStateToProps;
    return /** @class */ (function (_super) {
        __extends(WithStoreSubscription, _super);
        function WithStoreSubscription() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.state = {};
            return _this;
        }
        WithStoreSubscription.prototype.componentDidMount = function () {
            this.subsHandle = store.subscribe(this.handleChange, storeProps);
        };
        WithStoreSubscription.prototype.componentWillUnmount = function () {
            store.unsubscribe(this.subsHandle);
        };
        WithStoreSubscription.prototype.handleChange = function (e) {
            var _a;
            this.setState((_a = {},
                _a[e.key] = _mapValue(e.key, e.value, e.prev),
                _a));
        };
        WithStoreSubscription.prototype.render = function () {
            return React.createElement(wrappedComponent, __assign({}, this.props, _mapStateToProps(this.state)));
        };
        return WithStoreSubscription;
    }(React.Component));
};
