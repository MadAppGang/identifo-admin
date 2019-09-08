import Form from '../Form';

describe('edit user <UserForm />', () => {
  let props;

  beforeEach(() => {
    props = {
      onCancel: jest.fn(),
      onSubmit: jest.fn(),
      loading: false,
      user: {
        email: 'john@doe.com',
        name: 'John Doe',
      },
      error: null,
    };
  });

  test('renders as expected', () => {
    expect(shallow(<Form {...props} />)).toMatchSnapshot();
  });

  test('renders as expected with error', () => {
    props.error = new Error('error');
    expect(shallow(<Form {...props} />)).toMatchSnapshot();
  });

  test('renders as expected in "edit password" mode', () => {
    const component = shallow(<Form {...props} />);
    component.find('Toggle').simulate('change');
    expect(component).toMatchSnapshot();
  });

  test('calls onCancel prop function on "cancel" button click', () => {
    shallow(<Form {...props} />)
      .find('Button').at(1)
      .simulate('click');
    expect(props.onCancel).toBeCalled();
  });

  test('calls onSubmit prop function on "submit" button click', () => {
    const component = shallow(<Form {...props} />);

    const inputData = {
      name: 'Name',
      email: 'john@doe.com',
    };

    component.find('Input[name="name"]')
      .simulate('change', { target: { name: 'name', value: inputData.name } });
    component.find('Input[name="email"]')
      .simulate('change', { target: { name: 'email', value: inputData.email } });
    component.find('form').simulate('submit', { preventDefault: jest.fn() });

    expect(props.onSubmit)
      .toBeCalledWith({ ...inputData, password: '', confirmPassword: '' });
  });

  test('not empty validation message on "email" field', () => {
    const component = shallow(<Form {...props} />);

    const event = {
      target: {
        name: 'email',
        value: '',
      },
    };

    component.find('Input[name="email"]').simulate('blur', event);
    expect(component.find('Input[name="email"]').prop('errorMessage'))
      .toBe('Email should not be empty');
  });

  test('format validation message on "email" field', () => {
    const component = shallow(<Form {...props} />);

    const event = {
      target: {
        name: 'email',
        value: 'invalid@email',
      },
    };

    component.find('Input[name="email"]').simulate('blur', event);
    expect(component.find('Input[name="email"]').prop('errorMessage'))
      .toBe('Email format is invalid');
  });

  test('not empty validation message on "password" field', () => {
    const component = shallow(<Form {...props} />);
    component.find('Toggle').simulate('change');

    const event = {
      target: {
        name: 'password',
        value: '',
      },
    };

    component.find('Input[name="password"]').simulate('blur', event);
    expect(component.find('Input[name="password"]').prop('errorMessage'))
      .toBe('Password should not be empty');
  });

  test('not empty validation message on "confirmPassword" field', () => {
    const component = shallow(<Form {...props} />);
    component.find('Toggle').simulate('change');

    const event = {
      target: {
        name: 'confirmPassword',
        value: '',
      },
    };

    component.find('Input[name="confirmPassword"]').simulate('blur', event);
    expect(component.find('Input[name="confirmPassword"]').prop('errorMessage'))
      .toBe('You should confirm password');
  });

  test('passwords dont match validation message on "confirmPassword" field', () => {
    const component = shallow(<Form {...props} />);
    component.find('Toggle').simulate('change');

    const event = {
      target: {
        name: 'confirmPassword',
        value: 'happy',
      },
    };

    component.find('Input[name="confirmPassword"]').simulate('blur', event);
    expect(component.find('Input[name="confirmPassword"]').prop('errorMessage'))
      .toBe('Passwords should match');
  });
});
