import ApplicationForm from '..';

describe('<ApplicationForm />', () => {
  let props;

  beforeEach(() => {
    props = {
      loading: false,
      onSubmit: jest.fn(),
      onCancel: jest.fn(),
      application: {
        name: 'spa',
        type: 'web',
      },
      error: null,
    };
  });

  test('renders as expected', () => {
    expect(shallow(<ApplicationForm {...props} />)).toMatchSnapshot();
  });

  test('redenrs as expected with error', () => {
    props.error = new Error('error');
    expect(shallow(<ApplicationForm {...props} />)).toMatchSnapshot();
  });

  test('renders as expected when loading', () => {
    props.loading = true;
    expect(shallow(<ApplicationForm {...props} />)).toMatchSnapshot();
  });

  test('calls onCancel prop function on "cancel" button click', () => {
    shallow(<ApplicationForm {...props} />)
      .find('Button').at(1)
      .simulate('click');

    expect(props.onCancel).toBeCalled();
  });

  test('calls onSubmit prop function on "submit" button click', () => {
    const component = shallow(<ApplicationForm {...props} />);
    const inputData = {
      name: 'mobile client',
      type: 'android',
    };

    component.find('Input[name="name"]')
      .simulate('change', { target: { name: 'name', value: inputData.name } });
    component.find('Select').simulate('change', inputData.type);
    component.find('form').simulate('submit', { preventDefault: jest.fn() });
    expect(props.onSubmit).toBeCalledWith(inputData);
  });

  test('not empty validation message on "name" field', () => {
    const component = shallow(<ApplicationForm {...props} />);
    const event = {
      target: {
        name: 'name',
        value: '',
      },
    };

    component.find('Input[name="name"]').simulate('blur', event);
    expect(component.find('Input[name="name"]').prop('errorMessage'))
      .toBe('Application name should not be empty');
  });

  test('not empty validation message on "type" field', () => {
    const component = shallow(<ApplicationForm {...props} />);
    component.find('form').simulate('submit', { preventDefault: jest.fn() });
    expect(component.find('Select[name="type"]').prop('errorMessage'))
      .toBe('Application type should be selected');
  });
});
