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

  return Object.freeze({
    fetchApplications,
    fetchApplicationById,
  });
};

export default createApplicationServiceMock;
