import { ConnectionSettings } from '..';

describe('database <ConnectionSettings />', () => {
  let props;

  beforeEach(() => {
    props = {
      fetching: false,
      posting: false,
      fetchSettings: jest.fn(),
      postSettings: jest.fn(),
      resetError: jest.fn(),
      createNotification: jest.fn(),
      settings: {
        endpoint: 'endpoint:27017',
        name: 'db',
        type: 'mongodb',
      },
      error: null,
    };
  });

  test('matches snapshot', () => {
    expect(shallow(<ConnectionSettings {...props} />)).toMatchSnapshot();
  });

  test('matches snapshot when error', () => {
    props.error = new Error('err');
    expect(shallow(<ConnectionSettings {...props} />)).toMatchSnapshot();
  });

  test('matches snapshot when posting', () => {
    props.posting = true;
    expect(shallow(<ConnectionSettings {...props} />)).toMatchSnapshot();
  });

  test('matches snapshot when fetching', () => {
    props.fetching = true;
    expect(shallow(<ConnectionSettings {...props} />)).toMatchSnapshot();
  });

  test('calls fetchSettings on mount', () => {
    shallow(<ConnectionSettings {...props} />);
    expect(props.fetchSettings).toBeCalled();
  });

  test('calls fetchSettings on placeholder button click', () => {
    props.error = new Error('err');
    shallow(<ConnectionSettings {...props} />)
      .find('DatabasePlaceholder')
      .simulate('tryAgainClick');
    expect(props.fetchSettings).toBeCalled();
  });

  test('matches snapshot in editing mode', () => {
    const component = shallow(<ConnectionSettings {...props} />);
    component.find('Button').simulate('click');
    expect(component).toMatchSnapshot();
  });
});
