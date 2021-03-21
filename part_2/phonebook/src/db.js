import axios from "axios";
const baseUrl = "http://localhost:3001/persons";

const connectionError = { error: "Cannot connect to database" };
const notFoundError = (element) => ({
  error: `Could not find ${element} on the server`,
});

const getAll = async () => {
  try {
    const { data } = await axios.get(baseUrl);
    return { data };
  } catch {
    return connectionError;
  }
};

const create = async (contact) => {
  try {
    const { data } = await axios.post(baseUrl, contact);
    return { fullPerson: data };
  } catch {
    return connectionError;
  }
};

const delContact = async (contact) => {
  if (!window.confirm(`Are you sure you want to delete ${contact.name}?`))
    return { cancel: true };
  try {
    await axios.delete(`${baseUrl}/${contact.id}`);
    return {};
  } catch {
    return connectionError;
  }
};

const update = async (contact) => {
  if (
    !window.confirm(
      `Contact ${contact.name} already exists. Replace the old number with the new one?`
    )
  )
    return { cancel: true };
  try {
    const { data } = await axios.put(`${baseUrl}/${contact.id}`, contact);
    return { savedContact: data };
  } catch {
    return notFoundError(contact.name);
  }
};

const toExport = { getAll, create, delContact, update };

export default toExport;
