import axios from 'axios';

const API_URL = 'http://localhost:5173/api/users';

export const createUser = async (user) => {
  const response = await axios.post(API_URL, user);
  return response.data;
};

export const readUsers = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const updateUser = async (id, updates) => {
  const response = await axios.put(`${API_URL}/${id}`, updates);
  return response.data;
};

export const deleteUser = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};