import ProfileDropdown from '..';

describe('<ProfileDropdown />', () => {
  test('renders as expected', () => {
    expect(shallow(<ProfileDropdown />).find('Dropdown').dive()).toMatchSnapshot();
  });
});
