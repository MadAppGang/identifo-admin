import { SidebarSection } from '../Section';

describe('<SidebarSection />', () => {
  test('renders as expected for not selected section', () => {
    const props = {
      path: '/management/section',
      title: 'Section',
      match: {
        params: {
          section: '',
        },
      },
    };

    expect(shallow(<SidebarSection {...props} />)).toMatchSnapshot();
  });

  test('renders as expected for selected section', () => {
    const props = {
      path: '/management/section',
      title: 'Section',
      match: {
        params: {
          section: 'section',
        },
      },
    };

    expect(shallow(<SidebarSection {...props} />)).toMatchSnapshot();
  });
});
