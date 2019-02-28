import { EditUserView } from '..';

describe('<EditUserView />', () => {
  let props;

  beforeEach(() => {
    props = {
      fetchUserById: jest.fn(),
      alterUser: jest.fn(),
      deleteUserById: jest.fn(),
      resetError: jest.fn(),
      id: '1234',
      fetching: false,
      saving: false,
      user: {
        id: '1234',
        name: 'John Doe',
        email: 'john@doe.com',
      },
      error: null,
      history: {
        push: jest.fn(),
      },
    };
  });

  test('renders as expected', () => {
    expect(shallow(<EditUserView {...props} />)).toMatchSnapshot();
  });

  test('fetches user by id on mount', () => {
    shallow(<EditUserView {...props} />);
    expect(props.fetchUserById).toHaveBeenCalledWith(props.id);
  });

  test('calls alterUser prop on form submit', () => {
    const changes = {};

    shallow(<EditUserView {...props} />)
      .find('EditUserForm')
      .simulate('submit', changes);

    expect(props.alterUser).toBeCalledWith(props.id, changes);
  });

  test('calls resetError prop on form cancel', () => {
    shallow(<EditUserView {...props} />)
      .find('EditUserForm')
      .simulate('cancel');

    expect(props.resetError).toBeCalled();
  });
});
