import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUsers, addUser } from '../store';
import MySkeleton from './Skeleton';
import Button from './Button';
import { GoTrashcan } from 'react-icons/go';

const UsersList = () => {
  const dispatch = useDispatch();
  const { data, isLoading, error } = useSelector(state => state.users);
  // console.log('data: ', data);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  if (isLoading) {
    return <MySkeleton times={6} className="h-10 w-full" />;
  }
  if (error) {
    return <p>Somthing went wrong!!</p>;
  }

  const handleDeleteUser = id => {
    // dispatch(deleteUser(id))
  };

  const handleAddUser = () => {
    dispatch(addUser());
  };

  const renderedUsers = data?.map(user => (
    <div key={user.id} className="mb-2 border rounded">
      <div className="flex p-2 justify-between items-center cursor-pointer">
        {user.name}
        <Button danger onClick={() => handleDeleteUser(user.id)}>
          <GoTrashcan />
        </Button>
      </div>
    </div>
  ));
  return (
    <div>
      <div className="flex flex-row justify-between m-3">
        <h1 className="m-2 text-xl">Users</h1>
        <Button onClick={handleAddUser}> + Add User</Button>
      </div>
      {renderedUsers}
    </div>
  );
};

export default UsersList;
