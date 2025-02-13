import React, { createContext, useState, useEffect, useContext } from 'react';
import { auth, onAuthStateChanged } from './firebase'; // Import from your firebase.js

const AuthContext = createContext();

function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
            setLoading(false);
        });

        return unsubscribe; // Cleanup the listener when the component unmounts
    }, []);

    const authContextValue = {
        currentUser,
        loading,
    };

    return (
        <AuthContext.Provider value={authContextValue}>
            {!loading && children}
        </AuthContext.Provider>
    );
}

function useAuth() {
    return useContext(AuthContext);
}

export { AuthProvider, useAuth };