import { pause } from '~/utils';
import randomstring from 'randomstring';

const data = {
  applications: [
    {
      id: '507f1f77bcf86cd799439011',
      type: 'ios',
      name: 'Mobile Client (iOS)',
      secret: 'XwPp9xazJ0ku5CZnlmgAx2Dl',
      redirect_url: '',
      offline: false,
    },
    {
      id: '507f1f77bcf86cd799439242',
      type: 'web',
      name: 'Single Page App',
      secret: 'CwPp9xazJ0ku5CZnlmgAx2Da',
      redirect_url: 'https://client.identifo.com/callback',
      offline: true,
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
