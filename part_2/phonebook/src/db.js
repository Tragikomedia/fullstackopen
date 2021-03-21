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
  if (!window.confirm(`Are you sure you want to delete ${contact.name}?`))
    return;
  await axios.delete(`${baseUrl}/${contact.id}`);
};

const update = async (contact) => {
  if (
    !window.confirm(
      `Contact ${contact.name} already exists. Replace the old number with the new one?`
    )
  )
    return;
  const { data } = await axios.put(`${baseUrl}/${contact.id}`, contact);
  return data;
};

const toExport = { getAll, create, delContact, update };

export default toExport;
