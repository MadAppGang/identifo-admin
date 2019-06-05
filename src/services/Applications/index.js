const createApplicationService = ({ httpClient }) => {
  const baseUrl = process.env.API_URL;

  const fetchApplications = async () => {
    const url = `${baseUrl}/apps`;
    const { data = [] } = await httpClient.get(url);

    return data;
  };

  const fetchApplicationById = async (id) => {
    const url = `${baseUrl}/apps/${id}`;
    const { data } = await httpClient.get(url);

    return data;
  };

  const postApplication = async (application) => {
    const url = `${baseUrl}/apps`;
    const { data } = await httpClient.post(url, application);

    return data;
  };

  const alterApplication = async (id, changes) => {
    const url = `${baseUrl}/apps/${id}`;
    const { data } = await httpClient.put(url, changes);

    return data;
  };

  const deleteApplicationById = async (id) => {
    const url = `${baseUrl}/apps/${id}`;
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
