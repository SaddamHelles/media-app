import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { fetchUsers, addUser } from '../store';
import MySkeleton from './Skeleton';
import Button from './Button';
import { Snackbar, Alert } from '@mui/material';
import { useThunk } from '../hooks/use-thunk';
import UsersListItem from './UsersListItem';

const UsersList = () => {
  const [doFetchUsers, isLoadingUsers, loadingUsersError] =
    useThunk(fetchUsers);

  const [doAddUser, isCreatingUser, creatingUserError] = useThunk(addUser);

  const [open, setOpen] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };
  const { data } = useSelector(state => state.users);

  useEffect(() => {
    doFetchUsers();
  }, [doFetchUsers]);

  const handleAddUser = () => {
    doAddUser();
  };

  let content;
  if (isLoadingUsers) {
    content = <MySkeleton times={6} className="h-10 w-full" />;
  } else if (loadingUsersError) {
    content = <div>Error fetching data...</div>;
  } else {
    content = data?.map(user => <UsersListItem key={user.id} user={user} />);
  }

  if (loadingUsersError) {
    return <p>Somthing went wrong!!</p>;
  }

  return (
    <div>
      <div className="flex flex-row justify-between items-center m-3">
        <h1 className="m-2 text-xl">Users</h1>
        <Button loading={isCreatingUser} onClick={handleAddUser}>
          + Add User
        </Button>
        {creatingUserError && (
          <Snackbar
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            open={open}
            autoHideDuration={4000}
            onClose={handleClose}
          >
            <Alert severity="error" onClose={handleClose}>
              Something went wrong!!
            </Alert>
          </Snackbar>
        )}
      </div>
      {content}
    </div>
  );
};

export default UsersList;
