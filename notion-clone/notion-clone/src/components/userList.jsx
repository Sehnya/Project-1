import React from 'react';
import PropTypes from 'prop-types';

const UserList = ({ users = [], onUpdate, onDelete }) => {
  if (!Array.isArray(users)) {
    return null;
  }

  return (
    <div>
      {users.map((user) => (
        <div key={user.id}>
          <span>{user.name}</span>
          <span>{user.email}</span>
          <button onClick={() => onUpdate(user)}>Update</button>
          <button onClick={() => onDelete(user.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

UserList.propTypes = {
  users: PropTypes.array.isRequired,
  onUpdate: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default UserList;