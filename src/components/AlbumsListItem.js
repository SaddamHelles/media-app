import { Fragment } from 'react';
import { GoTrashcan } from 'react-icons/go';
import ExpanablePanel from './ExpanablePanel';
import { useRemoveAlbumMutation } from '../store';
import Button from './Button';
import PhotosList from './PhotosList';

const AlbumsListItem = ({ album }) => {
  const [removeAlbum, removeAlbumResults] = useRemoveAlbumMutation();

  const handleRemoveAlbum = album => {
    removeAlbum(album);
  };

  const header = (
    <Fragment>
      <Button
        className="mr-3"
        onClick={() => handleRemoveAlbum(album)}
        loading={removeAlbumResults.isLoading}
      >
        <GoTrashcan />
      </Button>
      <div>{album.title}</div>
    </Fragment>
  );
  return (
    <ExpanablePanel key={album.id} header={header}>
      <PhotosList album={album} />
    </ExpanablePanel>
  );
};

export default AlbumsListItem;
