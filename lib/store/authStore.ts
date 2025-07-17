import { create } from 'zustand';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase/config';
import * as authService from '../firebase/auth';
import { AuthState, User } from '../../types';

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: true,
  signIn: async (email: string, password: string) => {
    set({ loading: true });
    try {
      const user = await authService.signIn(email, password);
      set({ user, loading: false });
    } catch (error) {
      set({ loading: false });
      throw error;
    }
  },
  signUp: async (email: string, password: string, displayName?: string) => {
    set({ loading: true });
    try {
      const user = await authService.signUp(email, password, displayName);
      set({ user, loading: false });
    } catch (error) {
      set({ loading: false });
      throw error;
    }
  },
  signOut: async () => {
    set({ loading: true });
    try {
      await authService.signOut();
      set({ user: null, loading: false });
    } catch (error) {
      set({ loading: false });
      throw error;
    }
  },
  resetPassword: async (email: string) => {
    await authService.resetPassword(email);
  },
}));

onAuthStateChanged(auth, (firebaseUser) => {
  const { user } = useAuthStore.getState();
  
  if (firebaseUser && !user) {
    const mappedUser = authService.mapFirebaseUser(firebaseUser);
    useAuthStore.setState({ user: mappedUser, loading: false });
  } else if (!firebaseUser && user) {
    useAuthStore.setState({ user: null, loading: false });
  } else if (!firebaseUser && !user) {
    useAuthStore.setState({ loading: false });
  }
});