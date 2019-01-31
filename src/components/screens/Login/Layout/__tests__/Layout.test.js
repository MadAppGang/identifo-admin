import LoginScreenLayout from '..';

describe('<LoginScreenLayout />', () => {
  test('renders as expected', () => {
    expect(shallow(<LoginScreenLayout />)).toMatchSnapshot();
  });

  test('renders children when passed in', () => {
    const component = shallow(
      <LoginScreenLayout>
        <div>Hello, world!</div>
      </LoginScreenLayout>,
    );

    expect(component.contains(<div>Hello, world!</div>)).toBe(true);
  });
});
