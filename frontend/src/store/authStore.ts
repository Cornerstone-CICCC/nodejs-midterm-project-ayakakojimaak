import { create } from "zustand";
const API_URL = import.meta.env.VITE_API_URL;

type AuthState = {
  username: string | null;
  role: string | null;
  email: string | null;
  favorites: string[];
  setUsername: (name: string) => void;
  setRole: (name: string) => void;
  setEmail: (email: string) => void;
  addFavorite: (item: string) => void;
  removeFavorite: (item: string) => void;
  signin: (email: string, password: string) => Promise<boolean>;
};

export const useAuthStore = create<AuthState>((set) => ({
  username: null,
  favorites: [],
  role: null,
  email: null,
  setUsername: (name) => set({ username: name }),
  setRole: (name) => set({ role: name }),
  setEmail: (email) => set({ email: email }),
  addFavorite: (item) =>
    set((state) => ({
      favorites: [...state.favorites, item],
    })),
  removeFavorite: (item) =>
    set((state) => ({
      favorites: state.favorites.filter((fav) => fav !== item),
    })),
  signin: async (email, password) => {
    try {
      const res = await fetch(`${API_URL}/api/user/signin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        throw new Error("signin failed");
      }
      const data = await res.json();
      set({ username: data.username, email: data.email, role: data.role });
      return true; // 成功時
    } catch (error) {
      console.error(error);
      return false; // 失敗時
    }
  },
  logout: () => async () => {
    try {
      const res = await fetch("http://localhost:4500/api/user/signout", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.ok) {
        set({ username: null, email: null, role: null });
      }
    } catch (error) {
      console.error(error);
    }
  },
  checkAuth: async () => {
    try {
      const res = await fetch("http://localhost:4500/api/user/check", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        throw new Error("Not logged in");
      }
      const data = await res.json();
      set({ username: data.username, email: data.email, role: data.role });
      return true; // ログイン中
    } catch (error) {
      console.error(error);
      return false; // 未ログイン
    }
  },
}));
