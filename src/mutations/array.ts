import {DispatchEntity} from "../store/types";

export const push = (e: DispatchEntity, nextValue: any) => [...e.currentState, nextValue];

export const set = (e: DispatchEntity, nextValue: any[]) => [...nextValue];

export const clear = () => [];

export const filter = (
    e: DispatchEntity,
    nextValue: any,
    predicate: (a: any, b: any, idx: number) => boolean
) => e.currentState.filter((item, idx) => predicate(item, nextValue, idx));

export const sort = (e: DispatchEntity, predicate) => [...e.currentState].sort(predicate);