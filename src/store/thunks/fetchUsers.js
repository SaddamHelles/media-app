import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const fetchUsers = createAsyncThunk('users/fetch', async () => {
  const response = await axios.get('http://localhost:3500/users');
  await pause(2000);
  return response.data;
});

function pause(delay) {
  return new Promise(resolve => {
    setTimeout(resolve, delay);
  });
}

export { fetchUsers };
