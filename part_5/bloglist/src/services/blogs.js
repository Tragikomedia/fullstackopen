import axios from "axios";
const baseUrl = "api/blogs";

let token = null;

const setToken = (newToken) => {
  token = `bearer ${newToken}`;
  return token;
};
const getAll = async () => {
  const res = await axios.get(baseUrl);
  return res.data;
};

const create = async (blog) => {
  const res = await axios.post(baseUrl, blog, {
    headers: {
      Authorization: token,
    },
  });
  return res.data;
};

const toExport = { create, getAll, setToken };

export default toExport;
