import { configureStore } from '@reduxjs/toolkit';
import { userReducer } from './slices/userSlice';
import { addUser, removeUser } from './slices/userSlice';

export const store = configureStore({
  reducer: { users: userReducer },
});

export { addUser, removeUser };
