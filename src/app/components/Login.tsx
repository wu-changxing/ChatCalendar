// components/Login.tsx
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { app } from '../../../firebaseConfig';
import useAuthStore from '../../../authStore';

const LoginComponent: React.FC = () => {
  const user = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.setUser);

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
        <button onClick={handleGoogleSignIn}>Sign In with Google</button>
      )}
    </div>
  );
};

export default LoginComponent;