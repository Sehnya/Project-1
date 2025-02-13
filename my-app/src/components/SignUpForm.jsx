// src/components/SignUpForm.jsx
import React, { useState } from 'react';
import { signUp } from '../firebase'; // Import the signUp function

function SignUpForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState(''); // Add displayName state
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null); // Clear any previous errors
    try {
      await signUp(email, password, displayName); // Pass displayName
      // Redirect or update UI after successful sign-up
    } catch (error) {
      setError(error.message); // Set the error message
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div>
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
      </div>
      <div>
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
      </div>
      <div>
        <label>
          Display Name:
          <input
            type="text"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
          />
        </label>
      </div>
      <button type="submit">Sign Up</button>
    </form>
  );
}

export default SignUpForm;