import { GoTrashcan } from 'react-icons/go';
import { useRemovePhotoMutation } from '../store';

const PhotosListItem = ({ photo }) => {
  const [removePhoto, results] = useRemovePhotoMutation();
  const handleRemovePhoto = () => {
    removePhoto(photo);
  };
  return (
    <div className="relative cursor-pointer m-2">
      <img src={photo.url} className="h-20 w-20" alt={'random pic'} />
      <div
        onClick={handleRemovePhoto}
        className="absolute inset-0 flex items-center justify-center hover:bg-red-300 opacity-0 hover:opacity-80"
      >
        <GoTrashcan className="text-3xl" />
      </div>
    </div>
  );
};

export default PhotosListItem;
