import { LoginForm } from '..';

describe('<LoginForm />', () => {
  let props;

  beforeEach(() => {
    props = {
      login: jest.fn(),
      resetError: jest.fn(),
      signingIn: false,
      error: null,
    };
  });

  test('renders as expected', () => {
    expect(shallow(<LoginForm {...props} />)).toMatchSnapshot();
  });

  test('renders as expected when signing in', () => {
    props.signingIn = true;
    expect(shallow(<LoginForm {...props} />)).toMatchSnapshot();
  });

  test('renders as expected when error', () => {
    props.error = new Error('message');
    expect(shallow(<LoginForm {...props} />)).toMatchSnapshot();
  });

  test('calls login on form submit', () => {
    const component = shallow(<LoginForm {...props} />);

    component.find('form').simulate('submit', { preventDefault: jest.fn() });
    expect(props.login).toHaveBeenCalled();
  });

  test('calls login with credentials from inputs on submit button click', () => {
    const changeEvent = (name, value) => ({ target: { name, value } });
    const component = shallow(<LoginForm {...props} />);

    component
      .find('Input[name="email"]')
      .simulate('change', changeEvent('email', 'Email'));

    component
      .find('Input[name="password"]')
      .simulate('change', changeEvent('password', 'Password'));

    component.find('form').simulate('submit', { preventDefault: jest.fn() });
    expect(props.login).toHaveBeenCalledWith('Email', 'Password');
  });

  test('calls resetError on error message click', () => {
    props.error = new Error('message');
    const component = shallow(<LoginForm {...props} />);

    component.find('LoginErrorMessage').simulate('click');
    expect(props.resetError).toHaveBeenCalled();
  });
});
