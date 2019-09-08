import { ConnectionState } from '../ConnectionState';
import {
  CONNECTION_ESTABLISHED,
  CONNECTION_FAILED,
  CONNECTION_TEST_REQUIRED,
} from '~/modules/database/connectionReducer';

describe('database <ConnectionState />', () => {
  let props;

  beforeEach(() => {
    props = {
      checking: false,
      loading: false,
      state: CONNECTION_TEST_REQUIRED,
      testConnection: jest.fn(),
    };
  });

  test('matches snapshot when connection test required', () => {
    expect(shallow(<ConnectionState {...props} />)).toMatchSnapshot();
  });

  test('matches snapshot when connection established', () => {
    props.state = CONNECTION_ESTABLISHED;
    expect(shallow(<ConnectionState {...props} />)).toMatchSnapshot();
  });

  test('matches snapshot when connection failed', () => {
    props.state = CONNECTION_FAILED;
    expect(shallow(<ConnectionState {...props} />)).toMatchSnapshot();
  });

  test('calls testConnection on button click when test required', () => {
    shallow(<ConnectionState {...props} />).find('Button').simulate('click');
    expect(props.testConnection).toBeCalled();
  });
});
