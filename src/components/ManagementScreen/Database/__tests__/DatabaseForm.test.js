import Form from '../Form';

describe('<DatabaseForm />', () => {
  let props;

  beforeEach(() => {
    props = {
      posting: false,
      settings: {
        name: 'database',
        endpoint: 'localhost:27017',
        region: '',
        type: 'mongodb',
      },
      onCancel: jest.fn(),
      onSubmit: jest.fn(),
      error: null,
    };
  });

  test('matches snapshot', () => {
    expect(shallow(<Form {...props} />)).toMatchSnapshot();
  });

  test('matches snapshot when error', () => {
    props.error = new Error('error message');
    expect(shallow(<Form {...props} />)).toMatchSnapshot();
  });

  test('matches snapshot when posting', () => {
    props.posting = true;
    expect(shallow(<Form {...props} />)).toMatchSnapshot();
  });

  test('calls onCancel prop on cancel button click', () => {
    shallow(<Form {...props} />).find('Button').at(1).simulate('click');
    expect(props.onCancel).toBeCalled();
  });

  test('calls onCancel prop on cancel button click', () => {
    shallow(<Form {...props} />).find('Button').at(1).simulate('click');
    expect(props.onCancel).toBeCalled();
  });

  test('matches snapshot when type is mongodb', () => {
    const component = shallow(<Form {...props} />);
    component.find('Select[name="type"]').simulate('change', 'mongodb');

    expect(component).toMatchSnapshot();
  });

  test('matches snapshot when type is dynamodb', () => {
    const component = shallow(<Form {...props} />);
    component.find('Select[name="type"]').simulate('change', 'dynamodb');

    expect(component).toMatchSnapshot();
  });
});
