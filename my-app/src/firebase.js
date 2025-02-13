import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, updateProfile, sendEmailVerification, sendPasswordResetEmail } from "firebase/auth"; // Import auth functions

const firebaseConfig = {
    // Your Firebase configuration (apiKey, authDomain, etc.)
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app); // Get the auth instance

// --- Authentication Functions ---

// Sign Up
async function signUp(email, password, displayName) {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        // Update the user profile with displayName
        if (displayName) {
          await updateProfile(user, { displayName: displayName });
        }
        await sendEmailVerification(user)
        return user;
    } catch (error) {
        console.error("Error signing up:", error);
        throw error; // Re-throw the error so the calling component can handle it
    }
}

// Sign In
async function signIn(email, password) {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        return userCredential.user;
    } catch (error) {
        console.error("Error signing in:", error);
        throw error;
    }
}

// Sign Out
async function logout() {
    try {
        await signOut(auth);
    } catch (error) {
        console.error("Error signing out:", error);
        throw error;
    }
}
// Password Reset
async function resetPassword(email) {
  try {
    await sendPasswordResetEmail(auth, email);
  } catch (error) {
        console.error("Error sending password reset email:", error);
        throw error;
  }
}

export { db, auth, signUp, signIn, logout, onAuthStateChanged, resetPassword }; // Export everything