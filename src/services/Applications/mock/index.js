import { pause } from '~/utils';
import randomstring from 'randomstring';

const data = {
  applications: [
    {
      id: '5d08ee44e89bde6d23cdf031',
      active: false,
      name: 'Add',
      offline: false,
      type: 'web',
      redirect_url: 'https://hlsaf.com',
      registration_forbidden: false,
      tfa_status: 'disabled',
      authorization_way: 'no_authorization',
      new_user_default_role: '',
    },
  ],
};

const createApplicationServiceMock = () => {
  const fetchApplications = async () => {
    await pause(450);

    return {
      apps: data.applications,
      total: data.applications.length,
    };
  };

  const fetchApplicationById = async (id) => {
    const application = data.applications.find(a => a.id === id);

    if (application) {
      return { ...application };
    }

    throw new Error('Application not found');
  };

  const postApplication = async (application) => {
    await pause(550);

    if (application.name === 'Trigger Error') {
      throw new Error('Application with this name already exists.');
    }

    const insertion = {
      id: Date.now().toString(),
      ...application,
      clientId: randomstring.generate(32),
    };

    data.applications.push(insertion);

    return insertion;
  };

  const alterApplication = async (id, changes) => {
    await pause(550);

    if (changes.name === 'Trigger Error') {
      throw new Error('Application with this name already exists.');
    }

    data.applications = data.applications.map((application) => {
      if (application.id === id) {
        return {
          ...application,
          ...changes,
        };
      }

      return application;
    });

    const output = data.applications.find(app => app.id === id);

    if (output) {
      return output;
    }

    throw new Error('Cound not alter application');
  };

  const deleteApplicationById = async (id) => {
    await pause(500);

    data.applications = data.applications.filter(app => app.id !== id);

    return { result: 'ok' };
  };

  return Object.freeze({
    fetchApplications,
    fetchApplicationById,
    postApplication,
    alterApplication,
    deleteApplicationById,
  });
};

export default createApplicationServiceMock;
