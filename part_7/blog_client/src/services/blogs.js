import axios from 'axios';
const baseUrl = 'api/blogs';

let token = null;

const setToken = (newToken) => {
  token = `bearer ${newToken}`;
  return token;
};

const clearToken = () => {
  token = null;
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

const like = async (blog) => {
  const res = await axios.put(
    `${baseUrl}/${blog.id}`,
    { likes: blog.likes + 1 },
    {
      headers: {
        Authorization: token,
      },
    }
  );
  return res.data;
};

const del = async (blog) => {
  await axios.delete(`${baseUrl}/${blog.id}`, {
    headers: {
      Authorization: token,
    },
  });
};

const toExport = { create, clearToken, del, getAll, like, setToken };

export default toExport;
