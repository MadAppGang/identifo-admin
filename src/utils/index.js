export const pause = timeout => new Promise(resolve => setTimeout(resolve, timeout));

export const getError = (axiosErr) => {
  if (axiosErr.response && axiosErr.response.data) {
    return new Error(axiosErr.response.data.message);
  }

  return axiosErr;
};
