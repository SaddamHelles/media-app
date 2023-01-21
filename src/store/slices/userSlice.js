import { createSlice } from '@reduxjs/toolkit';

const usersSlice = createSlice({
  name: 'user',
  initialState: { data: [],loading:false, error:null },
  reducers: {
    addUser() {},
    removeUser() {},
  },
});

export const userReducer = usersSlice.reducer;
export const { addUser, removeUser } = usersSlice.actions;
