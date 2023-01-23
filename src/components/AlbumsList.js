import { useFetchAlbumsQuery, useAddAlbumMutation } from '../store';
import Button from './Button';
import MySkeleton from './Skeleton';
import AlbumsListItem from './AlbumsListItem';

const AlbumsList = ({ user }) => {
  const { data, error, isFetching } = useFetchAlbumsQuery(user);
  const [addAlbum, addAlbumResults] = useAddAlbumMutation();
  const handleAddAlbum = async () => {
    addAlbum(user);
  };

  let content;
  if (isFetching) content = <MySkeleton times={3} />;
  else if (error) {
    content = <div>Error loading albums.</div>;
  } else {
    content = data.map(album => {
      return <AlbumsListItem key={album.id} album={album} />;
    });
  }
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-lg font-bold">Albums for {user.name}</h3>
        <Button onClick={handleAddAlbum} loading={addAlbumResults.isLoading}>
          + Add Album
        </Button>
      </div>
      <div>{content}</div>
    </div>
  );
};

export default AlbumsList;
