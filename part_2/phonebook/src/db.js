import axios from "axios";
const baseUrl = "http://localhost:3001/persons";

const getAll = async () => {
  const { data } = await axios.get(baseUrl);
  return data;
};

const create = async (contact) => {
  const { data } = await axios.post(baseUrl, contact);
  return data;
};

const delContact = async (contact) => {
  if (!window.confirm(`Are you sure you want to delete ${contact.name}`))
    return;
  await axios.delete(`${baseUrl}/${contact.id}`);
};

const toExport = { getAll, create, delContact };

export default toExport;
