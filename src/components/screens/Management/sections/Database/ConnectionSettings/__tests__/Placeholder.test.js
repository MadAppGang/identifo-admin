import DatabasePlaceholder from '../Placeholder';

describe('<DatabasePlaceholder />', () => {
  test('matches snapshot when fetching', () => {
    expect(<DatabasePlaceholder fetching onTryAgainClick={jest.fn()} />)
      .toMatchSnapshot();
  });

  test('matches snapshot when not fetching', () => {
    expect(<DatabasePlaceholder fetching={false} onTryAgainClick={jest.fn()} />)
      .toMatchSnapshot();
  });

  test('calls onTryAgainClick on button click', () => {
    const onClick = jest.fn();
    shallow(<DatabasePlaceholder fetching={false} onTryAgainClick={onClick} />)
      .find('Button')
      .simulate('click');
    expect(onClick).toBeCalled();
  });
});
