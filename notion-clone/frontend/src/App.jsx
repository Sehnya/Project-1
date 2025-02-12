import React, { useState, useEffect } from 'react';
import UserForm from './components/UserForm.jsx';
import UserList from './components/UserList.jsx';
import { createUser, readUsers, updateUser, deleteUser } from './api.js';

export default function App() {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const users = await readUsers();
        setUsers(Array.isArray(users) ? users : []);
      } catch (error) {
        console.error('Failed to fetch users:', error);
        setError('Failed to fetch users');
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const handleCreateOrUpdateUser = async (user) => {
    try {
      if (editingUser) {
        const updatedUser = await updateUser(editingUser.id, user);
        setUsers(users.map((u) => (u.id === updatedUser.id ? updatedUser : u)));
        setEditingUser(null);
      } else {
        const newUser = await createUser(user);
        setUsers([...users, newUser]);
      }
    } catch (error) {
      console.error('Failed to save user:', error);
      setError('Failed to save user');
    }
  };

  const handleDeleteUser = async (id) => {
    try {
      await deleteUser(id);
      setUsers(users.filter((user) => user.id !== id));
    } catch (error) {
      console.error('Failed to delete user:', error);
      setError('Failed to delete user');
    }
  };

  return (
    <div>
      <h1>User Management</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <UserForm
            onSubmit={handleCreateOrUpdateUser}
            initialData={editingUser}
          />
          <UserList
            users={users}
            onUpdate={setEditingUser}
            onDelete={handleDeleteUser}
          />
        </>
      )}
    </div>
  );
}
