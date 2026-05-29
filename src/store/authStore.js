import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { users } from '../mockdata/users';

export const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      
      login: (email, password) => {
        const user = users.find(u => u.email === email && u.password === password);
        if (user) {
          const { password: _, ...userWithoutPassword } = user;
          set({ user: userWithoutPassword, isAuthenticated: true });
          return { success: true };
        }
        return { success: false, error: 'Credenciales inválidas' };
      },
      
      register: (email, password, name) => {
        const exists = users.find(u => u.email === email);
        if (exists) {
          return { success: false, error: 'El email ya está registrado' };
        }
        const newUser = {
          id: users.length + 1,
          email,
          name,
          role: 'user'
        };
        users.push({ ...newUser, password });
        set({ user: newUser, isAuthenticated: true });
        return { success: true };
      },
      
      logout: () => set({ user: null, isAuthenticated: false }),
    }),
    {
      name: 'auth-storage',
    }
  )
);
