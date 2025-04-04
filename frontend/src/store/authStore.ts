import { create } from "zustand";
const API_URL = import.meta.env.VITE_API_URL;

type AuthState = {
  username: string | null;
  role: string | null;
  email: string | null;
  id: string | null;
  favorites: string[];
  setUsername: (name: string) => void;
  setRole: (name: string) => void;
  setEmail: (email: string) => void;
  setId: (id: string) => void;
  updateEmail: (email: string) => Promise<boolean>;
  updateUsername: (username: string) => Promise<boolean>;
  signup: (username: string, email: string, password: string) => Promise<boolean>;
  signin: (email: string, password: string) => Promise<boolean>;
  signout: () => Promise<void | string>;
  checkAuth: () => Promise<boolean>;
};

export const useAuthStore = create<AuthState>((set) => ({
  username: null,
  favorites: [],
  role: null,
  email: null,
  id: null,
  setUsername: (name) => set({ username: name }),
  setRole: (name) => set({ role: name }),
  setEmail: (email) => set({ email: email }),
  setId: (id) => set({ id: id }),
  updateEmail: async (email) => {
    console.log(email);

    try {
      const res = await fetch(`${API_URL}/api/user/update`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ email }),
      });
      if (!res.ok) {
        throw new Error("update failed");
      }
      const data = await res.json();
      set({ email: data.email });
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  },
  updateUsername: async (username) => {
    try {
      const res = await fetch(`${API_URL}/api/user/update`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ username }),
      });
      if (!res.ok) {
        throw new Error("update failed");
      }
      const data = await res.json();
      set({ username: data.username });
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  },
  signup: async (username, email, password) => {
    try {
      const res = await fetch(`${API_URL}/api/user/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ username, email, password }),
      });
      if (!res.ok) {
        throw new Error("signup failed");
      }
      const data = await res.json();
      set({ username: data.username, email: data.email, role: data.role, id: data.id });
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  },
  signin: async (email, password) => {
    try {
      const res = await fetch(`${API_URL}/api/user/signin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });
      if (!res.ok) {
        throw new Error("signin failed");
      }
      const data = await res.json();
      console.log(data);
      // console.log(data.email);
      // set({ username: data.username, email: data.email, role: data.role, id: data.id });
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  },
  signout: async () => {
    try {
      const res = await fetch("http://localhost:4500/api/user/signout", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      if (res.ok) {
        set({ username: null, email: null, role: null, id: null });
        window.location.href = "/";
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
        credentials: "include",
      });
      if (!res.ok) {
        console.error("error checking auth");
        return false;
      }
      const data = await res.json();
      set({ username: data.username, email: data.email, role: data.role, id: data.id });
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  },
}));
