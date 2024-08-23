'use client';
import { useState, useEffect } from 'react';
import { getAllPosts } from '../utils/getAllPosts';

export interface Reactions {
  likes: number;
  dislikes: number;
}
export interface PostData {
  id: number;
  title: string;
  body: string;
  reactions: Reactions;
  views: number;
}

const usePosts = () => {
  const [posts, setPosts] = useState<PostData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllPosts();
        setPosts(data); 
      } catch (error) {
        setError((error as Error).message || 'Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return {
    posts,
    loading,
    error
  };
};
export default usePosts;

