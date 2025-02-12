import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const UserForm = ({ onSubmit, initialData = {} }) => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    ...initialData,
  });

  useEffect(() => {
    setUser({
      name: '',
      email: '',
      ...initialData,
    });
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(user);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        value={user.name}
        onChange={handleChange}
        placeholder="Name"
        required
      />
      <input
        type="email"
        name="email"
        value={user.email}
        onChange={handleChange}
        placeholder="Email"
        required
      />
      <button type="submit">Submit</button>
    </form>
  );
};

UserForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  initialData: PropTypes.object,
};

export default UserForm;
