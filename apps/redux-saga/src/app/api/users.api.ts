import axios from 'axios';

export const getUsers = () => {
  return axios.get<number>('/users', {
    params: {
      limit: 1000,
    },
  });
};

export const createUser = (firstName: string, lastName: string) => {
  return axios.post<number>('/users', {
    firstName,
    lastName,
  });
};
