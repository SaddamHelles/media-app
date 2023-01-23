import React, { Fragment } from 'react';
import { GoTrashcan } from 'react-icons/go';
import { useThunk } from '../hooks/use-thunk';
import { removeUser } from '../store';
import AlbumsList from './AlbumsList';
import Button from './Button';
import ExpanablePanel from './ExpanablePanel';

const UsersListItem = ({ user }) => {
  const [doRemoveUser, isRemovingUser, error] = useThunk(removeUser);

  const handleRemoveUser = user => {
    doRemoveUser(user);
  };

  const header = (
    <Fragment>
      <Button
        className="mr-3"
        loading={isRemovingUser}
        danger
        onClick={() => handleRemoveUser(user)}
      >
        <GoTrashcan />
      </Button>
      {error && <div>Error deleteing user.</div>}
      {user.name}
    </Fragment>
  );
  return (
    <ExpanablePanel header={header}>
      <AlbumsList user={user} />
    </ExpanablePanel>
  );
};

export default UsersListItem;
