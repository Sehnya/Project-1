import React, {useState} from 'react';
import {signIn, logout, resetPassword} from '../firebase';

function SignInForm () {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [resetEmailSent, setResetEmailSent] = useState(false); // Track if reset email was sent

    const handleSignIn = async (event) => {
        event.preventDefault();
        setError(null);
        try {
            await signIn(email, password);
        } catch (error){
            setError(error.message)
        }
    }
    const handleSignOut = async () => {
        try {
            await logout()
        } catch (error) {
            setError(error.message)
        }
    }
    const handleResetPassword = async () => {
    if (!email) {
      setError("Please enter your email address to reset your password.");
      return;
    }
        try {
            await resetPassword(email);
            setResetEmailSent(true); // Set the flag to true
            setError(null)
        } catch (error) {
            setError(error.message)
        }
    }
    return (
        <>
        <form onSubmit={handleSignIn}>
            {error && <p style={{color: 'red'}}>{error}</p>}
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
            <button type="submit">Sign In</button>
        </form>
        <div>
            <button onClick={handleSignOut}>Sign Out</button>
        </div>
        <div>
        <button onClick={handleResetPassword}>Forgot Password?</button>
        {resetEmailSent && <p>Password reset email sent to {email}.</p>}
      </div>
        </>
    )
}

export default SignInForm;