import axios from "axios";
const baseUrl = "api/blogs";

let token = null;

const setToken = (newToken) => {
  token =  `bearer ${newToken}`;
  return token;
}
const getAll = async () => {
  const res = await axios.get(baseUrl);
  return res.data;
};

const toExport = { getAll, setToken };

export default toExport;
