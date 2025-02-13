// src/App.jsx (Updated with Sign-Out)
import React from 'react';
import { useAuth } from './AuthContext';
import Workspace from './components/Workspace';
import SignUpForm from './components/SignUpForm';
import SignInForm from './components/SignInForm';
import { logout } from './firebase'; // Import logout

function App() {
  const { currentUser } = useAuth();

  const handleSignOut = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Error signing out:", error);
      // Display error to the user, perhaps with a toast or alert
    }
  };

  return (
    <div>
      {currentUser ? (
        <>
          <p>Welcome, {currentUser.email}!</p>
          <Workspace />
          <button onClick={handleSignOut}>Sign Out</button> {/* Add sign-out button */}
        </>
      ) : (
        <>
          <SignUpForm />
          <SignInForm />
        </>
      )}
    </div>
  );
}

export default App;