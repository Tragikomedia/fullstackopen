import axios from 'axios';
const baseUrl = 'api/login';

const localStorageKey = 'blogAppUser';

const login = async (credentials) => {
  const res = await axios.post(baseUrl, credentials);
  return res.data;
};

const save = (user) => {
  window.localStorage.setItem(localStorageKey, JSON.stringify(user));
};

const load = () => {
  return JSON.parse(window.localStorage.getItem(localStorageKey));
};

const clear = () => {
  window.localStorage.removeItem(localStorageKey);
};

const toExport = { login, save, load, clear };

export default toExport;
