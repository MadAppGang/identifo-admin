import LoginErrorMessage from '../ErrorMessage';

describe('<LoginErrorMessage />', () => {
  test('renders as expected', () => {
    const props = {
      onClick: jest.fn(),
      message: 'Hello, world!',
    };

    expect(shallow(<LoginErrorMessage {...props} />)).toMatchSnapshot();
  });

  test('calls onClick prop on button click', () => {
    const onClick = jest.fn();

    shallow(<LoginErrorMessage message="msg" onClick={onClick} />)
      .find('button')
      .simulate('click');

    expect(onClick).toHaveBeenCalled();
  });
});
