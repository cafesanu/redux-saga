import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { usersSlice, usersSelector } from './slices/users.slice';

export const App = () => {
  const dispatch = useDispatch();
  const users = useSelector(usersSelector);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  useEffect(() => {
    dispatch(usersSlice.actions.getUserRequest());
  }, []);

  const createUser = () => {
    dispatch(
      usersSlice.actions.createUserRequest({
        firstName,
        lastName,
      })
    );
    setFirstName('');
    setLastName('');
  };

  return (
    <>
      <h1>Create User</h1>
      <div>
        <label>first Name</label>
        <input
          value={firstName}
          onChange={(e) => {
            setFirstName(e.target.value);
          }}
        ></input>
      </div>
      <div>
        <label>last Name</label>
        <input
          value={lastName}
          onChange={(e) => {
            setLastName(e.target.value);
          }}
        ></input>
      </div>
      <button onClick={createUser}>Create User</button>

      <h1>Users</h1>
      {users.map((u) => {
        return (
          <div key={u.id}>
            {u.firstName} {u.lastName}
          </div>
        );
      })}
    </>
  );
};
