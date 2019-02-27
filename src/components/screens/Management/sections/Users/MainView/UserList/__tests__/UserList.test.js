import UserList from '..';

describe('<UserList />', () => {
  let props;

  beforeEach(() => {
    props = {
      users: [
        {
          id: '1234',
          name: 'John Doe',
          email: 'email@gmail.com',
          latestLogin: 'Never',
          numberOfLogins: 0,
        },
        {
          id: '2345',
          name: 'Foo Bazz',
          email: 'different@email.com',
          latestLogin: '2 hours ago',
          numberOfLogins: 2,
        },
      ],
      loading: false,
    };
  });

  test('renders as expected', () => {
    expect(shallow(<UserList {...props} />)).toMatchSnapshot();
  });

  test('renders as expected when loading', () => {
    props.loading = true;
    expect(shallow(<UserList {...props} />)).toMatchSnapshot();
  });

  test('renders as expected when not loading and no users', () => {
    props.loading = false;
    props.users = [];
    expect(shallow(<UserList {...props} />)).toMatchSnapshot();
  });
});
