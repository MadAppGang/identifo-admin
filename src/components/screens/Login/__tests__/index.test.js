import LoginScreen from '..';

describe('<LoginScreen />', () => {
  test('renders as expected', () => {
    expect(shallow(<LoginScreen />)).toMatchSnapshot();
  });
});
