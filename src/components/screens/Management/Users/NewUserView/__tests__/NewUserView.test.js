import { NewUserView } from '..';

describe('<NewUserView />', () => {
  let props;

  beforeEach(() => {
    props = {
      postUser: jest.fn(),
      resetError: jest.fn(),
      saving: false,
      error: null,
      history: {
        push: jest.fn(),
      },
    };
  });

  test('renders as expected', () => {
    expect(shallow(<NewUserView {...props} />)).toMatchSnapshot();
  });

  test('passes error to UserForm', () => {
    props.error = new Error('error');
    const component = shallow(<NewUserView {...props} />);

    expect(component.find('UserForm').prop('error')).toEqual(props.error);
  });

  test('passes saving to UserForm', () => {
    props.saving = true;
    const component = shallow(<NewUserView {...props} />);

    expect(component.find('UserForm').prop('saving')).toEqual(props.saving);
  });

  test('calls postUser on UserForm submit', () => {
    const user = { id: '11' };
    shallow(<NewUserView {...props} />).find('UserForm').simulate('submit', user);
    expect(props.postUser).toBeCalledWith(user);
  });

  test('calls resetError on UserForm cancel', () => {
    shallow(<NewUserView {...props} />).find('UserForm').simulate('cancel');
    expect(props.resetError).toBeCalled();
  });

  test('pushes to history on UserForm cancel', () => {
    shallow(<NewUserView {...props} />).find('UserForm').simulate('cancel');
    expect(props.history.push).toBeCalledWith('/management/users');
  });
});
