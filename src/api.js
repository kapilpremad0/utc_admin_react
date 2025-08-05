import axios from 'axios';

const API_BASE_URL = `http://localhost:8000/api/admin`;

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});
// === Boots ===
export const fetchBoots = async () => {
 const res = await axios.get('http://localhost:5000/api/admin/boots');
  return res.data;
};

export const createBoot = async (bootData) => {
  const res = await API.post('/boots', bootData);
  return res.data;
};

export const updateBoot = async (id, bootData) => {
  const res = await API.put(`/boots/${id}`, bootData);
  return res.data;
};
