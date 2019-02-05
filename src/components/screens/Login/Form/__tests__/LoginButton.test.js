import LoginButton from '../LoginButton';

describe('<LoginButton />', () => {
  test('renders as expected', () => {
    expect(shallow(<LoginButton onClick={jest.fn()} />)).toMatchSnapshot();
  });

  test('calls onClick prop on button click', () => {
    const onClick = jest.fn();

    shallow(<LoginButton onClick={onClick} />)
      .find('Button')
      .simulate('click');

    expect(onClick).toHaveBeenCalled();
  });
});
