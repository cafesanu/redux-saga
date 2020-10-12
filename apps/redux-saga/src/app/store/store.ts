import { userSagas } from './../slices/users.slice';
import { all } from 'redux-saga/effects';
import { usersSlice } from '../slices/users.slice';
import {
  combineReducers,
  configureStore,
  getDefaultMiddleware,
} from '@reduxjs/toolkit';
import { ReducersMapObject } from 'redux';
import createSagaMiddleware from 'redux-saga';

const sagaMiddleware = createSagaMiddleware();
const middleware = [...getDefaultMiddleware({ thunk: false }), sagaMiddleware];

export const reducers: ReducersMapObject = {
  users: usersSlice.reducer,
};

export function* rootSaga() {
  yield all([...userSagas]);
}

export const store = configureStore({
  reducer: combineReducers(reducers),
  middleware,
});

sagaMiddleware.run(rootSaga);
