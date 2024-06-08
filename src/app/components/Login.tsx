// components/LoginComponent.tsx
import { useEffect, useState } from 'react';
import { getAuth, GoogleAuthProvider, signInWithPopup, User } from 'firebase/auth';
import { app } from '../../../firebaseConfig';

const LoginComponent: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const auth = getAuth(app);
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  const handleGoogleSignIn = async () => {
    const auth = getAuth(app);
    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      setUser(user);
      // User signed in successfully
    } catch (error) {
      // Handle login error
      console.error('Error signing in with Google:', error);
    }
  };

  const handleSignOut = async () => {
    const auth = getAuth(app);

    try {
      await auth.signOut();
      setUser(null);
      // User signed out successfully
    } catch (error) {
      // Handle sign out error
      console.error('Error signing out:', error);
    }
  };

  return (
    <div>
      {user ? (
        <div>
          <p>Welcome, {user.displayName}!</p>
          <button onClick={handleSignOut}>Sign Out</button>
        </div>
      ) : (
        <div>
          <p>Please sign in to continue.</p>
          <button onClick={handleGoogleSignIn}>Sign In with Google</button>
        </div>
      )}
    </div>
  );
};

export default LoginComponent;