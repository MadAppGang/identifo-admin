import Sidebar from '..';

describe('<Sidebar />', () => {
  test('renders as expected', () => {
    expect(shallow(<Sidebar />)).toMatchSnapshot();
  });
});
