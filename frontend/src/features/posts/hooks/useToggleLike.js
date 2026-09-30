import { useCallback } from 'react';
import { useLikePostMutation, useUnlikePostMutation } from '../api/postsApi';

export const useToggleLike = () => {
  const [likePost] = useLikePostMutation();
  const [unlikePost] = useUnlikePostMutation();

  return useCallback(
    (post) => (post.liked ? unlikePost(post.id) : likePost(post.id)),
    [likePost, unlikePost],
  );
};
