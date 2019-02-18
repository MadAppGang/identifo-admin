import { pause } from '~/utils';

const data = {
  users: [
    {
      id: '507f1f77bcf86cd799439011',
      name: 'Denys Provodnikov',
      email: 'dp@madappgang.com',
      latestLogin: 'Never',
      numberOfLogins: 0,
    },
    {
      id: '507f191e810c19729de860ea',
      name: 'John Doe',
      email: 'john.doe@gmail.com',
      latestLogin: 'Yesterday',
      numberOfLogins: 3,
    },
    {
      id: '507f191e810c19729de860cf',
      name: 'Falangus Minelly',
      email: 'angus.fm@gmail.com',
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

    return data.users;
  };

  const postUser = async (user) => {
    await pause(600);

    return data.users.push({
      ...user,
      id: data.users.length,
      numberOfLogins: 0,
      latestLogin: 'Never',
    });
  };

  const alterUser = async (id, changes = {}) => {
    await pause(380);

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

  return Object.freeze({
    fetchUsers,
    postUser,
    alterUser,
  });
};

export default createUserServiceMock;
