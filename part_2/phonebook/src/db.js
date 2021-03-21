import axios from 'axios';
const baseUrl = 'http://localhost:3001/persons';

const getAll = async () => {
    const {data} = await axios.get(baseUrl);
    return data;
}

const create = async (contact) => {
    const {data} = await axios.post(baseUrl, contact);
    return data;
}

const toExport = { getAll, create }

export default toExport;