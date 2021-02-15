import { ENV } from '~/utils/environment';

const createStaticService = ({ httpClient }) => {
  const API_URL = ENV.getApiUrl();
  const fetchStaticFile = async (name, ext = 'html') => {
    const url = `${API_URL}/admin/static/template?name=${name}&ext=${ext}`;
    const response = await httpClient.get(url);

    return response.data.contents;
  };

  const updateStaticFile = async (name, ext, contents) => {
    const url = `${API_URL}/admin/static/template?name=${name}&ext=${ext}`;
    await httpClient.put(url, { contents });
  };

  return {
    fetchStaticFile,
    updateStaticFile,
  };
};

export default createStaticService;
