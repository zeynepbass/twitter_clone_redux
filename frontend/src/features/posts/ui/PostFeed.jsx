import { useEffect } from 'react';
import { getErrorMessage } from '../../../shared/lib/format';
import { useInView } from '../../../shared/hooks/useInView';
import { Spinner } from '../../../shared/ui/Spinner';
import { StatusMessage } from '../../../shared/ui/StatusMessage';
import { useGetPostsInfiniteQuery } from '../api/postsApi';
import { PostCard } from './PostCard';
import { PostSkeleton } from './PostSkeleton';

const EAGER_IMAGE_COUNT = 1;

export const PostFeed = ({ tag, q, emptyTitle = 'Henüz gönderi yok', emptyDescription }) => {
  const { data, error, isLoading, isError, isFetching, hasNextPage, isFetchingNextPage, fetchNextPage, refetch } =
    useGetPostsInfiniteQuery({ tag, q });
  const [sentinelRef, sentinelVisible] = useInView();

  useEffect(() => {
    if (sentinelVisible && hasNextPage && !isFetching) fetchNextPage();
  }, [sentinelVisible, hasNextPage, isFetching, fetchNextPage]);

  if (isLoading) return <PostSkeleton />;

  if (isError && !data) {
    return (
      <StatusMessage
        title="Gönderiler yüklenemedi"
        description={getErrorMessage(error)}
        action="Tekrar dene"
        onAction={refetch}
      />
    );
  }

  const posts = data?.pages.flatMap((page) => page.items) ?? [];
  const eagerIds = posts
    .filter((post) => post.image)
    .slice(0, EAGER_IMAGE_COUNT)
    .map((post) => post.id);

  if (posts.length === 0) {
    return <StatusMessage title={emptyTitle} description={emptyDescription} />;
  }

  return (
    <section aria-label="Gönderiler" aria-busy={isFetching}>
      {posts.map((post) => (
        <PostCard
          key={post.id}
          post={post}
          eager={eagerIds.includes(post.id)}
          priority={post.id === eagerIds[0]}
        />
      ))}

      {hasNextPage && (
        <div ref={sentinelRef} className="flex justify-center py-6">
          {isFetchingNextPage && <Spinner />}
        </div>
      )}
    </section>
  );
};
