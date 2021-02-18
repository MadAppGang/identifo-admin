const initializeConfig = () => {
  const envApiUrl = process.env.API_URL ? process.env.API_URL : window.location.origin;
  return {
    API_URL: process.env.API_URL_SUFFIX ? `${envApiUrl}${process.env.API_URL_SUFFIX}` : envApiUrl,
  };
};
const config = initializeConfig();

export default config;
