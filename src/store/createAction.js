"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function createAction(e, s) {
    return function () {
        var actionArguments = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            actionArguments[_i] = arguments[_i];
        }
        var curr = s.getState(e.key);
        var next = e.mutation.apply(e, [{ key: e.key, currentState: curr, info: e.info }].concat(actionArguments));
        return s.dispatch({
            key: e.key,
            currentState: next,
            info: e.info
        });
    };
}
exports.createAction = createAction;
