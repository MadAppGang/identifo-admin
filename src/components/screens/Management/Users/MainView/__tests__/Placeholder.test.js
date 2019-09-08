import UsersPlaceholder from '../Placeholder';

describe('<UsersPlaceholder />', () => {
  let props;

  beforeEach(() => {
    props = {
      onCreateNewUserClick: jest.fn(),
    };
  });

  test('renders as expected', () => {
    expect(shallow(<UsersPlaceholder {...props} />)).toMatchSnapshot();
  });

  test('calls props onClick function on button click', () => {
    shallow(<UsersPlaceholder {...props} />).find('Button').simulate('click');
    expect(props.onCreateNewUserClick).toBeCalled();
  });
});
