import ManagementScreenContent from '..';

describe('<ManagementScreenContent />', () => {
  test('renders as expected', () => {
    expect(shallow(<ManagementScreenContent />)).toMatchSnapshot();
  });

  test('renders children when passed in', () => {
    const component = shallow(
      <ManagementScreenContent>
        <div>Hello, world!</div>
      </ManagementScreenContent>,
    );

    expect(component.contains(<div>Hello, world!</div>)).toBe(true);
  });
});
