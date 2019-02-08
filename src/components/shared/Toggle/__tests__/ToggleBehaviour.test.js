import ToggleBehaviour from '../Behaviour';

describe('<ToggleBehaviour />', () => {
  test('calls children when passed in as a function', () => {
    const render = jest.fn();

    shallow(<ToggleBehaviour onChange={() => {}}>{render}</ToggleBehaviour>);

    expect(render).toBeCalled();
  });

  test('renders content returned from the children function', () => {
    const render = () => (
      <div>Hello, world!</div>
    );

    const component = shallow(
      <ToggleBehaviour onChange={jest.fn()}>{render}</ToggleBehaviour>,
    );

    expect(component.contains(render())).toBe(true);
  });

  test('turns on after toggle button was clicked', () => {
    const render = jest.fn(({ on, toggle }) => (
      <>
        {on && (
          <div>Hello, world!</div>
        )}
        <button onClick={toggle}>Click me</button>
      </>
    ));

    const component = shallow(
      <ToggleBehaviour onChange={jest.fn()}>{render}</ToggleBehaviour>,
    );

    component.find('button').simulate('click');

    expect(component.contains(<div>Hello, world!</div>)).toBe(true);
  });

  test('calls onChange prop function after toggle butotn was clicked', () => {
    const render = jest.fn(({ toggle }) => (
      <button onClick={toggle}>Click me</button>
    ));

    const onChange = jest.fn();

    const component = shallow(
      <ToggleBehaviour onChange={onChange}>{render}</ToggleBehaviour>,
    );

    component.find('button').simulate('click');

    expect(onChange).toBeCalledWith({ on: true });
  });
});
