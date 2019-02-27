import { UsersMainView } from '..';

describe('<UsersMainView />', () => {
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
      ],
      fetching: false,
      fetchUsers: jest.fn(),
      history: {
        push: jest.fn(),
      },
    };
  });

  test('renders as expected', () => {
    expect(shallow(<UsersMainView {...props} />)).toMatchSnapshot();
  });

  test('renders as expected with no users', () => {
    props.users = [];
    expect(shallow(<UsersMainView {...props} />)).toMatchSnapshot();
  });

  test('calls fetchUsers prop on mount', () => {
    shallow(<UsersMainView {...props} />);
    expect(props.fetchUsers).toBeCalled();
  });

  test('pushes to history on "create user" button click', () => {
    shallow(<UsersMainView {...props} />).find('Button').simulate('click');
    expect(props.history.push).toBeCalledWith('/management/users/new');
  });

  test('calls fetchUsers prop on search value change', () => {
    shallow(<UsersMainView {...props} />)
      .find('SearchInput')
      .simulate('change', 'value');

    expect(props.fetchUsers).toBeCalledWith({ search: 'value' });
  });

  test('pushes to history on "create user" button (placeholder)', () => {
    props.users = [];

    shallow(<UsersMainView {...props} />)
      .find('UsersPlaceholder')
      .simulate('createNewUserClick');

    expect(props.history.push).toBeCalledWith('/management/users/new');
  });
});
