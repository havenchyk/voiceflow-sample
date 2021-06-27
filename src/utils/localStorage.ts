const setItem = (key: string, value: string) => {
  localStorage.setItem(key, value);
};

const getItem = (key: string) => {
  return localStorage.getItem(key);
};

const remove = (key: string) => {
  localStorage.removeItem(key);
};

export { getItem, remove, setItem };
