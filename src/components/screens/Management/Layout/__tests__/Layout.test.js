import ManagementScreenLayout from '..';

describe('<ManagementScreenLayout />', () => {
  test('renders as expected', () => {
    expect(shallow(<ManagementScreenLayout />)).toMatchSnapshot();
  });

  test('renders children when passed in', () => {
    const component = shallow(
      <ManagementScreenLayout>
        <div>Hello, world!</div>
      </ManagementScreenLayout>,
    );

    expect(component.contains(<div>Hello, world!</div>)).toBe(true);
  });
});
