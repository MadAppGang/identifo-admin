import { pause } from '~/utils';

const data = {
  applications: [],
};

const createApplicationServiceMock = () => {
  const fetchApplications = async () => {
    await pause(450);

    return data.applications;
  };

  return Object.freeze({
    fetchApplications,
  });
};

export default createApplicationServiceMock;
