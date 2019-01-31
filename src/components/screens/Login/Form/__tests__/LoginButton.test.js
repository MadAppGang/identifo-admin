import LoginButton from '../LoginButton';

describe('<LoginButton />', () => {
  test('renders as expected', () => {
    expect(shallow(<LoginButton onClick={jest.fn()} />)).toMatchSnapshot();
  });

  test('renders a loading indicator when loading is passed in as true', () => {
    expect(shallow(<LoginButton onClick={jest.fn()} loading />)).toMatchSnapshot();
  });

  test('calls onClick prop on button click', () => {
    const onClick = jest.fn();

    shallow(<LoginButton onClick={onClick} />)
      .find('button')
      .simulate('click');

    expect(onClick).toHaveBeenCalled();
  });
});
