import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { faker } from '@faker-js/faker';

const addUser = createAsyncThunk('add/user', async () => {
  console.log(faker.name.fullName());
  const response = await axios.post('http://localhost:3500/users', {
    name: faker.name.fullName(),
  });

  return response.data;
});

export { addUser };
