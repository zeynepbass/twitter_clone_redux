import { useEffect } from 'react';
import { useRegisterViewMutation } from '../api/postsApi';

const STORAGE_KEY = 'viewed-posts';

const readViewed = () => {
  try {
    return new Set(JSON.parse(window.sessionStorage.getItem(STORAGE_KEY) ?? '[]'));
  } catch {
    return new Set();
  }
};

const markViewed = (viewed) => {
  try {
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify([...viewed]));
  } catch {
    return;
  }
};

export const useRegisterView = (postId) => {
  const [registerView] = useRegisterViewMutation();

  useEffect(() => {
    if (!postId) return;

    const viewed = readViewed();
    if (viewed.has(postId)) return;

    viewed.add(postId);
    markViewed(viewed);
    registerView(postId);
  }, [postId, registerView]);
};
