import { useEffect, useState } from 'react';
import { signInWithEmailAndPassword, User } from 'firebase/auth';
import { auth } from '../../../firebaseConfig'

function LoginComponent() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState<User | null>(null);

  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      setUser(userCredential.user);
      // User signed in successfully
    } catch (error) {
      // Handle login error
    }
  };

  return (
    // Render login form and handle form submission
    <h1>Login</h1>
  );
}