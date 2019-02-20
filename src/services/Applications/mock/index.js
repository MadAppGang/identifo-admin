import { pause } from '~/utils';

const data = {
  applications: [
    {
      id: '507f1f77bcf86cd799439011',
      type: 'ios',
      name: 'Mobile Client (iOS)',
      clientId: '4AOlbR7eGCsuuA43bhmahd9iZ14lzcPY',
    },
    {
      id: '507f1f77bcf86cd799439242',
      type: 'web',
      name: 'Single Page App',
      clientId: 'TlWqkOPFr1hJVL70LjTk19eTayNst6cU',
    },
  ],
};

const createApplicationServiceMock = () => {
  const fetchApplications = async () => {
    await pause(450);

    return data.applications;
  };

  const fetchApplicationById = async (id) => {
    await pause(350);

    const application = data.applications.find(a => a.id === id);

    if (application) {
      return { ...application };
    }

    throw new Error('Application not found');
  };

  const postApplication = async (application) => {
    await pause(550);

    const insertion = {
      id: Date.now().toString(),
      ...application,
      clientId: Date.now().toString() + Date.now(),
    };

    data.applications.push(insertion);

    return insertion;
  };

  const alterApplication = async (id, changes) => {
    await pause(550);

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
