import { memo } from 'react';
import { Link } from 'react-router';
import { formatRelativeTime } from '../../../shared/lib/format';
import { usePrefetch } from '../api/postsApi';
import { PostActions } from './PostActions';
import { PostImage } from './PostImage';
import { TagList } from './TagList';

export const PostCard = memo(function PostCard({ post, eager = false, priority = false }) {
  const prefetch = usePrefetch('getPost');

  return (
    <article className="relative border-b border-line px-4 pt-3 pb-1 transition-colors hover:bg-hover">
      <div className="flex items-baseline gap-1 text-[15px] text-muted">
        {post.subtitle && <span className="truncate">{post.subtitle}</span>}
        {post.subtitle && post.createdAt && <span aria-hidden="true">·</span>}
        {post.createdAt && (
          <time dateTime={post.createdAt} className="shrink-0">
            {formatRelativeTime(post.createdAt)}
          </time>
        )}
      </div>

      <h2 className="mt-0.5 text-[15px] font-bold leading-5 text-fg">
        <Link
          to={`/detay/${post.id}`}
          onMouseEnter={() => prefetch(post.id)}
          onFocus={() => prefetch(post.id)}
          className="after:absolute after:inset-0 focus-visible:outline-none focus-visible:after:rounded-sm focus-visible:after:outline-2 focus-visible:after:outline-brand"
        >
          {post.title}
        </Link>
      </h2>

      {post.description && (
        <p className="mt-1 line-clamp-4 text-[15px] leading-5 whitespace-pre-line text-fg">{post.description}</p>
      )}

      <TagList tags={post.tags} />
      <PostImage src={post.image} eager={eager} priority={priority} className="mt-3" />
      <PostActions post={post} className="mt-1" />
    </article>
  );
});
