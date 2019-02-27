import { NewApplicationView } from '..';

describe('<NewApplicationView />', () => {
  let props;

  beforeEach(() => {
    props = {
      saving: false,
      error: null,
      postApplication: jest.fn(),
      resetError: jest.fn(),
      history: {
        push: jest.fn(),
      }
    };
  });

  test('renders as expected', () => {
    expect(shallow(<NewApplicationView {...props} />)).toMatchSnapshot();
  });

  test('passes error to ApplicationForm', () => {
    props.error = new Error('error');
    const component = shallow(<NewApplicationView {...props} />);

    expect(component.find('ApplicationForm').prop('error')).toEqual(props.error);
  });

  test('passes saving to ApplicationForm', () => {
    props.saving = true;
    const component = shallow(<NewApplicationView {...props} />);

    expect(component.find('ApplicationForm').prop('loading')).toEqual(props.saving);
  });

  test('calls postApplication on ApplicationForm submit', () => {
    const application = { id: '11' };
    shallow(<NewApplicationView {...props} />)
      .find('ApplicationForm')
      .simulate('submit', application);
    expect(props.postApplication).toBeCalledWith(application);
  });

  test('calls resetError on ApplicationForm cancel', () => {
    shallow(<NewApplicationView {...props} />)
      .find('ApplicationForm')
      .simulate('cancel');
    expect(props.resetError).toBeCalled();
  });

  test('pushes to history on ApplicationForm cancel', () => {
    shallow(<NewApplicationView {...props} />)
      .find('ApplicationForm')
      .simulate('cancel');
    expect(props.history.push).toBeCalledWith('/management/applications');
  });
});
