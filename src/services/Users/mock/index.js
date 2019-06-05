import { pause } from '~/utils';

/* eslint-disable */

const data = {
  users: [
    {
      id: '507f1f77bcf86cd799439011',
      username: 'Denys Provodnikov',
      email: 'dp@madappgang.com',
      latestLogin: 'Never',
      numberOfLogins: 0,
    },
    {
      id: '507f191e810c19729de860ea',
      username: 'John Doe',
      email: 'john.doe@gmail.com',
      latestLogin: 'Yesterday',
      numberOfLogins: 3,
    },
    {
      id: '507f191e810c19729de860cf',
      username: 'Jessica Bower',
      email: 'jess@gmail.com',
      latestLogin: '2 hours ago',
      numberOfLogins: 14,
    },
  ],
};

const createUserServiceMock = () => {
  const fetchUsers = async (filters = {}) => {
    const { search } = filters;

    if (search) {
      await pause(300);

      return data.users.filter((user) => {
        return user.name.toLowerCase().includes(search.toLowerCase())
        || user.email.toLowerCase().includes(search.toLowerCase());
      });
    }

    await pause(600);

    return {
      users: data.users,
      total: data.users.length,
    };
  };

  const postUser = async (user) => {
    await pause(600);

    if (user.name === 'Trigger Error') {
      throw new Error('This name is already taken.');
    }

    const insertion = {
      ...user,
      id: Date.now().toString(),
      numberOfLogins: 0,
      latestLogin: 'Never',
      password: undefined,
    };

    data.users.push(insertion);

    return insertion;
  };

  const alterUser = async (id, changes = {}) => {
    await pause(600);

    if (changes.name === 'Trigger Error') {
      throw new Error('This name is already taken');
    }

    data.users = data.users.map((user) => {
      if (user.id === id) {
        return {
          ...user,
          ...changes,
        };
      }
      return user;
    });

    return data.users.find(user => user.id === id);
  };

  const fetchUserById = async (id) => {
    const user = data.users.find(u => u.id === id);

    if (!user) {
      return Promise.reject(new Error('User is not found'));
    }

    return user;
  };

  const deleteUserById = async (id) => {
    await pause(600);

    data.users = data.users.filter(u => u.id !== id);
  };

  return Object.freeze({
    fetchUsers,
    postUser,
    alterUser,
    fetchUserById,
    deleteUserById,
  });
};

export default createUserServiceMock;
