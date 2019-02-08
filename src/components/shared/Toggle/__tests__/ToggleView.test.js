import ToggleView from '../View';

describe('<ToggleView />', () => {
  test('matches snapshot when turned off', () => {
    const props = {
      on: false,
      toggle: jest.fn(),
      label: 'Label',
    };

    expect(shallow(<ToggleView {...props} />)).toMatchSnapshot();
  });

  test('matches snapshot when turned on', () => {
    const props = {
      on: true,
      toggle: jest.fn(),
      label: 'Label',
    };

    expect(shallow(<ToggleView {...props} />)).toMatchSnapshot();
  })
});
