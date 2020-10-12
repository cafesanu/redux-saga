import { call } from 'redux-saga/effects';

type ThenArg<T> = T extends Promise<infer U> ? U : T;

export function* sagaCall<T = any>(fn: (...args: any[]) => T) {
  type SuccessArg = ThenArg<T>;

  return (call(fn) as unknown) as IterableIterator<number>;
}
