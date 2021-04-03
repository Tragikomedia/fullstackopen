import axios from "axios";

const baseUrl = "http://localhost:3001/anecdotes";

const genId = () => Math.floor(Math.random() * 1000000).toString();

const getAll = async () => {
  const res = await axios.get(baseUrl);
  return res.data;
};

const save = async (content) => {
  const res = await axios.post(baseUrl, { content, id: genId(), votes: 0 });
  return res.data;
};

const vote = async (anecdote) => {
  await axios.patch(`${baseUrl}\\${anecdote.id}`, { votes: anecdote.votes + 1 });
};

const toExport = { getAll, save, vote };

export default toExport;
