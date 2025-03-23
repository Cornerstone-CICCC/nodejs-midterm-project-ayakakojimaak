import { create } from "zustand";
import { Comment } from "../types/Comment";

const API_URL = import.meta.env.VITE_API_URL;

type CommentState = {
  comments: Comment[];
  getComments: () => Promise<Comment[]>;
  getCommentsByCocktailId: (cocktailId: string) => Promise<void>;
  getCommentsByAuthorId: () => Promise<Comment[]>;
  addComment: (cocktailId: string, cocktailName: string, text: string, rate: number) => Promise<boolean>;
  editComment: (commentId: string, text: string, rate: number) => Promise<boolean>;
  deleteComment: (commentId: string) => Promise<boolean>;
};

export const useCommentStore = create<CommentState>((set) => ({
  comments: [],
  getComments: async () => {
    try {
      const res = await fetch(`${API_URL}/api/comments`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to fetch comments");
      const data = await res.json();
      return data;
    } catch (error) {
      console.error(error);
    }
  },
  getCommentsByCocktailId: async (cocktailId) => {
    try {
      const res = await fetch(`${API_URL}/api/comments/cocktail/${cocktailId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      console.log(res);
      if (!res.ok) throw new Error("Failed to fetch comments");
      const data = await res.json();
      set({ comments: data });
    } catch (error) {
      set({ comments: [] });
    }
  },

  getCommentsByAuthorId: async () => {
    try {
      const res = await fetch(`${API_URL}/api/comments/author`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to fetch comments");
      const data = await res.json();
      return data;
    } catch (error) {
      console.error(error);
    }
  },

  addComment: async (cocktailId, cocktailName, text, rate) => {
    try {
      const res = await fetch(`${API_URL}/api/comments/cocktail/${cocktailId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ text, rate, cocktailName }),
      });
      if (!res.ok) throw new Error("Failed to add comment");
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  },

  editComment: async (commentId, text, rate) => {
    try {
      const res = await fetch(`${API_URL}/api/comments/${commentId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ text, rate }),
      });
      if (!res.ok) throw new Error("Failed to edit comment");
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  },

  deleteComment: async (commentId) => {
    try {
      const res = await fetch(`${API_URL}/api/comments/${commentId}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to delete comment");
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  },
}));
