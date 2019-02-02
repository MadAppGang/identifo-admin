import Dropdown from '..';

describe('<Dropdown />', () => {
  test('renders nothing if children function was not provided', () => {
    expect(shallow(<Dropdown />)).toMatchSnapshot();
  });

  test('calls children function on render', () => {
    const render = jest.fn();
    shallow(<Dropdown>{render}</Dropdown>);
    expect(render).toHaveBeenCalled();
  });

  test('renders what children function has returned', () => {
    const render = jest.fn(() => (
      <div>Hello, world!</div>
    ));
    const output = shallow(<Dropdown>{render}</Dropdown>);

    expect(output.contains(<div>Hello, world!</div>)).toBe(true);
  });

  test('calls passed in render function with isOpen=false by default', () => {
    const render = jest.fn(() => null);

    shallow(<Dropdown>{render}</Dropdown>);
    expect(render.mock.calls[0][0].isOpen).toBe(false);
  });

  test('calls passed in render function with isOpen=true after "open" prop was called', () => {
    const render = jest.fn(({ open }) => (
      <button type="button" onClick={open}>Click me</button>
    ));

    const output = shallow(<Dropdown>{render}</Dropdown>);

    output.find('button').simulate('click');

    const secondCall = render.mock.calls[1];

    expect(secondCall[0].isOpen).toBe(true);
  });
});
