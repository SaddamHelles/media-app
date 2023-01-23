import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { userReducer } from './slices/userSlice';
import { ablumsApi } from './apis/albumsApi';
import { photosApi } from './apis/photosApi';

export const store = configureStore({
  reducer: {
    users: userReducer,
    [ablumsApi.reducerPath]: ablumsApi.reducer,
    [photosApi.reducerPath]: photosApi.reducer,
  },
  middleware: getDefaultMiddleware => {
    return getDefaultMiddleware()
      .concat(ablumsApi.middleware)
      .concat(photosApi.middleware);
  },
});

window.storeObj = store;

setupListeners(store.dispatch);

export * from './thunks/fetchUsers';
export * from './thunks/addUser';
export * from './thunks/removeUser';
export * from './apis/albumsApi';
export * from './apis/photosApi';
