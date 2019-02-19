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

  const fetchApplicationById = async (id) => {
    const url = `${baseUrl}/applications/${id}`;

    try {
      const response = await httpClient.get(url);
      return response.data;
    } catch (err) {
      throw getError(err);
    }
  };

  const postApplication = async (application) => {
    const url = `${baseUrl}/applications`;

    try {
      const response = await httpClient.post(url, application);
      return response.data;
    } catch (err) {
      throw getError(err);
    }
  };

  const alterApplication = async (id, changes) => {
    const url = `${baseUrl}/applications/${id}`;

    try {
      const response = await httpClient.put(url, changes);
      return response.data;
    } catch (err) {
      throw getError(err);
    }
  };

  const deleteApplicationById = async (id) => {
    const url = `${baseUrl}/applicatoins/${id}`;

    try {
      const response = await httpClient.delete(url);
      return response.data;
    } catch (err) {
      throw getError(err);
    }
  };

  return Object.freeze({
    fetchApplications,
    fetchApplicationById,
    postApplication,
    alterApplication,
    deleteApplicationById,
  });
};

export default createApplicationService;
