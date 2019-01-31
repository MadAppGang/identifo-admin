import Header from '..';

describe('<ManagementScreenHeader />', () => {
  test('renders as expected', () => {
    expect(shallow(<Header />)).toMatchSnapshot();
  });
});
