import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { faker } from '@faker-js/faker';

// function pause(delay) {
//   return new Promise(resolve => {
//     setTimeout(resolve, delay);
//   });
// }

const ablumsApi = createApi({
  reducerPath: 'album',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3500',
    fetchFn: async (...arg) => {
      // await pause(2000);
      return fetch(...arg);
    },
  }),
  endpoints(builder) {
    return {
      fetchAlbums: builder.query({
        providesTags: (result, error, user) => {
          const tags = result.map(album => ({ type: 'Album', id: album.id }));
          tags.push({ type: 'UserAlbums', id: user.id });
          return tags;
        },
        query: user => {
          return {
            url: '/albums',
            params: {
              userId: user.id,
            },
            method: 'GET',
          };
        },
      }),
      addAlbum: builder.mutation({
        invalidatesTags: (result, error, user) => {
          return [{ type: 'UserAlbums', id: user.id }];
        },
        query: user => {
          return {
            url: '/albums',
            body: {
              userId: user.id,
              title: faker.commerce.productName(),
            },
            method: 'POST',
          };
        },
      }),
      removeAlbum: builder.mutation({
        invalidatesTags: (result, error, ablum) => {
          return [{ type: 'Album', id: ablum.id }];
        },
        query: ablum => {
          return {
            url: `/albums/${ablum.id}`,
            method: 'DELETE',
            credentials: 'include',
          };
        },
      }),
    };
  },
});

export const {
  useFetchAlbumsQuery,
  useAddAlbumMutation,
  useRemoveAlbumMutation,
} = ablumsApi;
export { ablumsApi };
