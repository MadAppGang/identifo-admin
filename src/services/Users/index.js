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

  const postUser = async (user) => {
    const url = `${baseUrl}/users`;

    try {
      const response = await httpClient.post(url, user);
      return response.data;
    } catch (err) {
      throw getError(err);
    }
  };

  const alterUser = async (id, changes) => {
    const url = `${baseUrl}/users/${id}`;

    try {
      const response = await httpClient.put(url, changes);
      return response.data;
    } catch (err) {
      throw getError(err);
    }
  };

  const fetchUserById = async (id) => {
    const url = `${baseUrl}/users/${id}`;

    try {
      const response = await httpClient.get(url);
      return response.data;
    } catch (err) {
      throw getError(err);
    }
  };

  const deleteUserById = async (id) => {
    const url = `${baseUrl}/users/${id}`;

    try {
      const response = await httpClient.delete(url);
      return response.data;
    } catch (err) {
      throw getError(err);
    }
  };

  return Object.freeze({
    fetchUsers,
    postUser,
    alterUser,
    fetchUserById,
    deleteUserById,
  });
};

export default createUserService;
