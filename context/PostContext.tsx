import { createContext, useContext, useEffect, useRef, useState, ReactNode } from "react";
import { useUser } from "@/context/UserContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import type { Post } from "@/types";

type PostContextType = {
  posts: Post[];
  addPost: (text: string) => void;
  toggleLike: (id: string) => void;
  deletePost: (id: string) => void;
  clearPosts: () => Promise<void>;
  addComment: (postId: string, text: string, userName?: string) => void;
  deleteComment: (postId: string, commentId: string) => void;
  updatePost: (id: string, text: string) => void;
  toggleBookmark: (id: string) => void;
};

const PostContext = createContext<PostContextType | undefined>(undefined);

export function PostProvider({ children }: { children: ReactNode }) {
  const [posts, setPosts] = useState<Post[]>([]);
  const { user } = useUser();

  const STORAGE_KEY = "posts";
  // hydrate from storage
  useEffect(() => {
    (async () => {
      try {
        const raw = await AsyncStorage.getItem(STORAGE_KEY);
        if (raw) {
          setPosts(JSON.parse(raw));
        } else {
          setPosts([]);
        }
      } catch {
        // ignore hydration errors
      }
    })();
  }, []);

  // persist on change (debounced)
  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => {
    if (saveTimer.current) clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(async () => {
      try { await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(posts)); } catch {}
    }, 250);
    return () => { if (saveTimer.current) clearTimeout(saveTimer.current); };
  }, [posts]);

  const addPost = (text: string) => {
    const newPost = {
      id: Date.now().toString(),
      user: user.name || "You",
      avatar: user.avatarUrl,
      text,
      createdAt: new Date().toLocaleTimeString(),
      likes: 0,
      likedByYou: false,
      comments: [],
      bookmarked: false,
    };
    setPosts([newPost, ...posts]);
  };

  const toggleLike = (id: string) => {
    setPosts(prev => prev.map(p => {
      if (p.id !== id) return p;
      const likedByYou = !p.likedByYou;
      const likes = Math.max(0, (p.likes || 0) + (likedByYou ? 1 : -1));
      return { ...p, likedByYou, likes };
    }));
  };

  const deletePost = (id: string) => {
    setPosts(prev => prev.filter(p => p.id !== id));
  };

  const clearPosts = async () => {
    try {
      await AsyncStorage.removeItem("posts");
    } catch {}
    setPosts([]);
  };

  const addComment = (postId: string, text: string, userName?: string) => {
    const author = (userName || user.name || 'You');
    const newComment = {
      id: `${Date.now()}`,
      user: author,
      text,
      createdAt: new Date().toLocaleTimeString(),
    };
    setPosts(prev => prev.map(p => p.id === postId ? { ...p, comments: [newComment, ...(p.comments || [])] } : p));
  };

  const deleteComment = (postId: string, commentId: string) => {
    setPosts(prev => prev.map(p => p.id === postId ? { ...p, comments: (p.comments || []).filter(c => c.id !== commentId) } : p));
  };

  const updatePost = (id: string, text: string) => {
    setPosts(prev => prev.map(p => p.id === id ? { ...p, text } : p));
  };

  const toggleBookmark = (id: string) => {
    setPosts(prev => prev.map(p => p.id === id ? { ...p, bookmarked: !p.bookmarked } : p));
  };
  return (
    <PostContext.Provider value={{ posts, addPost, toggleLike, deletePost, clearPosts, addComment, deleteComment, updatePost, toggleBookmark }}>
      {children}
    </PostContext.Provider>
  );
}

export function usePosts() {
  const ctx = useContext(PostContext);
  if (!ctx) throw new Error("usePosts must be used inside PostProvider");
  return ctx;
}
