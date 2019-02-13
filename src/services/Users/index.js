import { format as formatUrl } from 'url';
import { getError } from '~/utils';

const createUserService = ({ httpClient }) => {
  const baseUrl = window.location.origin;

  const fetchUsers = async (filters = {}) => {
    const { search } = filters;

    const url = formatUrl({
      pathname: `${baseUrl}/users`,
      query: {
        search,
      },
    });

    try {
      const response = await httpClient.get(url);
      return response.data;
    } catch (err) {
      throw getError(err);
    }
  };

  return Object.freeze({
    fetchUsers,
  });
};

export default createUserService;
