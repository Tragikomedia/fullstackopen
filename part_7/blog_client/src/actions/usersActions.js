import usersService from '../services/users';

export const getAllUsers = async () => {
  const users = await usersService.getAll();
  return { type: 'GET_ALL_USERS', data: { users } };
};

