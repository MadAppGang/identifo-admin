export const ENV = {
  getApiUrl() {
    const apiUrl = process.env.API_URL ? process.env.API_URL : window.location.origin;
    return process.env.API_URL_SUFFIX ? `${apiUrl}${process.env.API_URL_SUFFIX}` : apiUrl;
  },
};
