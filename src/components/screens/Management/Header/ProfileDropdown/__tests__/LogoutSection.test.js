import { LogoutSection } from '../LogoutSection';

describe('<LogoutSection />', () => {
  test('renders as expected', () => {
    expect(shallow(<LogoutSection logout={jest.fn()} />)).toMatchSnapshot();
  });

  test('calls logout prop function on button click', () => {
    const logout = jest.fn();

    shallow(<LogoutSection logout={logout} />).find('button').simulate('click');
    expect(logout).toHaveBeenCalled();
  });
});
