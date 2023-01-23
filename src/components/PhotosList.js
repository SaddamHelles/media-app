import React from 'react';
import { useFetchPhotosQuery, useAddPhotoMutation } from '../store';
import MySkeleton from './Skeleton';
import PhotosListItem from './PhotosListItem';
import Button from './Button';

const PhotosList = ({ album }) => {
  const { data, error, isFetching } = useFetchPhotosQuery(album);
  const [addPhoto, addPhotoResults] = useAddPhotoMutation();

  let content;
  if (isFetching) {
    content = <MySkeleton times={4} />;
  } else if (error) {
    content = <p>Error fetching photos...</p>;
  } else {
    content = data.map(photo => (
      <PhotosListItem key={photo.id} photo={photo} />
    ));
  }

  const handleAddPhoto = () => {
    addPhoto(album);
  };
  return (
    <div>
      <div className="m-2 flex flex-row items-center justify-between">
        <h3 className="text-lg font-bold">Photos in {album.title}</h3>
        <Button loading={addPhotoResults.isLoading} onClick={handleAddPhoto}>
          + Add Photo
        </Button>
      </div>
      <div className="flex flex-row flex-wrap mx-8 justify-center">
        {content}
      </div>
    </div>
  );
};

export default PhotosList;
