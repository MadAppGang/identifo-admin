import { pause } from '~/utils';

const data = {
  users: [
    {
      id: '1',
      name: 'Denys Provodnikov',
      email: 'dp@madappgang.com',
      latestLogin: 'Never',
      numberOfLogins: 0,
    },
    {
      id: '2',
      name: 'John Doe',
      email: 'john.doe@gmail.com',
      latestLogin: 'Yesterday',
      numberOfLogins: 3,
    },
    {
      id: '3',
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

    await pause(1000);

    if (search) {
      return data.users.filter((user) => {
        return user.name.includes(search) || user.email.includes(search);
      });
    }

    return data.users;
  };

  return Object.freeze({
    fetchUsers,
  });
};

export default createUserServiceMock;
