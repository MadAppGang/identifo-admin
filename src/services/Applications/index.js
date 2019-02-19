import { getError } from '~/utils';

const createApplicationService = ({ httpClient }) => {
  const baseUrl = window.location.origin;

  const fetchApplications = async () => {
    const url = `${baseUrl}/applications`;

    try {
      const response = await httpClient.get(url);
      return response.data;
    } catch (err) {
      throw getError(err);
    }
  };

  return Object.freeze({
    fetchApplications,
  });
};

export default createApplicationService;
