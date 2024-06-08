// authStore.ts
import create from 'zustand';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';
import { app } from './firebaseConfig';

type AuthState = {
  user: User | null;
  loading: boolean;
  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
};

const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: true,
  setUser: (user) => set({ user }),
  setLoading: (loading) => set({ loading }),
}));

export const initializeAuth = () => {
  const auth = getAuth(app);
  const unsubscribe = onAuthStateChanged(auth, (user) => {
    useAuthStore.getState().setUser(user);
    useAuthStore.getState().setLoading(false);
  });

  return unsubscribe;
};

export default useAuthStore;