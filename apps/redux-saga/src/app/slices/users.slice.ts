import { getUsers, createUser } from './../api/users.api';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { call, fork, put, takeEvery, takeLatest } from 'redux-saga/effects';
import { sagaCall } from '../helpers/call';

interface Users {
  id: number;
  firstName: string;
  lastName: string;
}

export interface UsersStateType {
  users: Users[];
}

const initialState: UsersStateType = {
  users: [],
};

type CreateActionPayload = PayloadAction<{
  firstName: string;
  lastName: string;
}>;

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    createUserRequest: (state, action: CreateActionPayload) => {
      console.log(state);
      return state;
    },
    getUserRequest: (state) => state,
    getUserSuccess: (state, action: PayloadAction<Users[]>) => {
      return {
        ...state,
        users: action.payload,
      };
    },
  },
});

// Sagas
function* handleGetUsers() {
  try {
    const result = yield call(getUsers);

    yield put(usersSlice.actions.getUserSuccess(result.data.data));
  } catch (error) {
    console.log(error);
  }
}

export function* watchGetUsersRequest() {
  yield takeEvery(usersSlice.actions.getUserRequest, handleGetUsers);
}

function* handleCreateUsers(action: CreateActionPayload) {
  console.log(action);
  try {
    yield call(createUser, action.payload.firstName, action.payload.lastName);
    yield call(handleGetUsers);
  } catch (error) {
    console.log(error);
  }
}

export function* watchCreateUsersRequest() {
  yield takeLatest(usersSlice.actions.createUserRequest, handleCreateUsers);
}

export const userSagas = [
  fork(watchGetUsersRequest),
  fork(watchCreateUsersRequest),
];

//selectors

export const usersSelector = ({ users }: { users: UsersStateType }) =>
  users.users;
