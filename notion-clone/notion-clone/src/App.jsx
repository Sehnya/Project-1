import React, { useState, useEffect } from 'react';
import UserForm from './components/UserForm.jsx';
import UserList from './components/UserList.jsx';
import { createUser, readUsers, updateUser, deleteUser } from './api';

export default function App() {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      const users = await readUsers();
      setUsers(Array.isArray(users) ? users : []);
    };
    fetchUsers();
  }, []);

  const handleCreateOrUpdateUser = async (user) => {
    if (editingUser) {
      const updatedUser = await updateUser(editingUser.id, user);
      setUsers(users.map((u) => (u.id === updatedUser.id ? updatedUser : u)));
      setEditingUser(null);
    } else {
      const newUser = await createUser(user);
      setUsers([...users, newUser]);
    }
  };

  const handleDeleteUser = async (id) => {
    await deleteUser(id);
    setUsers(users.filter((user) => user.id !== id));
  };

  return (
    <div>
      <h1>User Management</h1>
      <UserForm onSubmit={handleCreateOrUpdateUser} initialData={editingUser} />
      <UserList users={users} onUpdate={setEditingUser} onDelete={handleDeleteUser} />
    </div>
  );
}