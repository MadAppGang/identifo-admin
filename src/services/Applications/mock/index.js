import { pause } from '~/utils';

const data = {
  applications: [{
    id: '1',
    name: 'webapp',
  }],
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
      return application;
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

  return Object.freeze({
    fetchApplications,
    fetchApplicationById,
    postApplication,
  });
};

export default createApplicationServiceMock;
