import { ENV } from '~/utils/environment';

const createApplicationService = ({ httpClient }) => {
  const baseUrl = ENV.getApiUrl();

  const fetchApplications = async () => {
    const url = `${baseUrl}/admin/apps`;
    const { data = [] } = await httpClient.get(url);

    return data;
  };

  const fetchApplicationById = async (id) => {
    const url = `${baseUrl}/admin/apps/${id}`;
    const { data } = await httpClient.get(url);

    return data;
  };

  const postApplication = async (application) => {
    const url = `${baseUrl}/admin/apps`;
    const { data } = await httpClient.post(url, application);

    return data;
  };

  const alterApplication = async (id, changes) => {
    const url = `${baseUrl}/admin/apps/${id}`;
    const { data } = await httpClient.put(url, changes);

    return data;
  };

  const deleteApplicationById = async (id) => {
    const url = `${baseUrl}/admin/apps/${id}`;
    const { data } = await httpClient.delete(url);

    return data;
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
