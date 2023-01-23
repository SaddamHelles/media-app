import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { faker } from '@faker-js/faker';

function pause(delay) {
  return new Promise(resolve => {
    setTimeout(resolve, delay);
  });
}

const photosApi = createApi({
  reducerPath: 'photos',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3500',
    fetchFn: async (...arg) => {
      await pause(2000);
      return fetch(...arg);
    },
  }),
  endpoints: builder => {
    return {
      fetchPhotos: builder.query({
        providesTags: (result, error, album) => {
          const tags = result.map(photo => ({ type: 'Photo', id: photo.id }));
          tags.push({ type: 'AlbumPhotos', id: album.id });
          return tags;
        },
        query: album => {
          return {
            url: '/photos',
            params: {
              albumId: album.id,
            },
            method: 'GET',
          };
        },
      }),
      addPhoto: builder.mutation({
        invalidatesTags: (result, error, album) => {
          return [{ type: 'AlbumPhotos', id: album.id }];
        },
        query: album => {
          return {
            method: 'POST',
            url: '/photos',
            body: {
              albumId: album.id,
              url: faker.image.abstract(150, 150, true),
            },
          };
        },
      }),
      removePhoto: builder.mutation({
        invalidatesTags: (result, error, photo) => {
          return [{ type: 'Photo', id: photo.id }];
        },
        query: photo => {
          return {
            method: 'DELETE',
            url: `/photos/${photo.id}`,
          };
        },
      }),
    };
  },
});

export { photosApi };
export const {
  useFetchPhotosQuery,
  useAddPhotoMutation,
  useRemovePhotoMutation,
} = photosApi;
