const createStorage = (key) => {
  const set = value => localStorage.setItem(key, value);

  const get = () => localStorage.getItem(key);

  const clear = () => localStorage.removeItem(key);

  return Object.freeze({
    set, get, clear,
  });
};

export default createStorage;
